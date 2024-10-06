import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import GameMapsService from 'game-maps/game-maps.service';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from 'pubSub/pubSub.module';
import { Repository } from 'typeorm';
import UsersService from 'users/users.service';
import { Exceptions } from 'utils';

import GameServer from '../game-servers.model';
import { Enums, Inputs } from '../utils';

import GameServersQueryService from './queries.service';

@Injectable()
class GameServersMutationsService {
    constructor(
        @InjectRepository(GameServer) private gameServersRepo: Repository<GameServer>,
        @Inject(forwardRef(() => PUB_SUB)) private readonly pubSub: RedisPubSub,
        private readonly gameMapService: GameMapsService,
        private readonly userService: UsersService,
        private readonly gameServerQueryService: GameServersQueryService
    ) {}

    async createServer(data: Inputs.CreateServer, req: Request) {
        const { mapId, password, name } = data;
        const user = await this.userService.getUser(req, { relations: { ownedServers: true } });

        if (user.ownedServers.length > 30) Exceptions.maxCount(30);
        if (user.ownedServers.find((i) => i.name === name)) Exceptions.notUnique();

        const hashPass = password ? await bcrypt.hash(password, 5) : '';
        const map = await this.gameMapService.getMapById(mapId);
        const newServer = await this.gameServersRepo.create({ name, map, password: hashPass, private: !!data.password });
        user.ownedServers.push(newServer);
        await this.userService.save(user);
        await this.pubSub.publish(Enums.SUBSCRIPTION.NEW_SERVER, { newServer: { ...newServer, owner: user } });

        return newServer;
    }

    async joinServer(serverId: number, req: Request) {
        const user = await this.userService.getUser(req);

        try {
            const server = await this.gameServerQueryService.getServerById(serverId, { relations: ['users', 'owner'] });
            await this.gameServersRepo.createQueryBuilder().relation(GameServer, 'users').of(server).add(user);
            server.users.push(user);
            await this.pubSub.publish(Enums.SUBSCRIPTION.UPDATE_SERVER, { server, user });
            await this.pubSub.publish(Enums.SUBSCRIPTION.NEW_PEER, { server, peerId: user.id });

            return true;
        } catch (e) {
            Exceptions.serverError();
        }
    }

    async leaveServer(serverId: number, req: Request) {
        try {
            const user = await this.userService.getUser(req);
            const server = await this.gameServerQueryService.getServerById(serverId, { relations: ['users', 'owner'] });

            await this.gameServersRepo.createQueryBuilder().relation(GameServer, 'users').of(server).remove(user);
            server.users = server.users.filter((i) => i.id !== user.id);
            await this.pubSub.publish(Enums.SUBSCRIPTION.UPDATE_SERVER, { server, user });
            await this.pubSub.publish(Enums.SUBSCRIPTION.REMOVE_PEER, { server, peerId: user.id });

            return true;
        } catch (e) {
            Exceptions.serverError();
        }
    }

    async sendSdp(data: Inputs.SDP) {
        const sdp: RTCSessionDescription = JSON.parse(data.sdp);

        try {
            const server = await this.gameServerQueryService.getServerById(data.serverId, { relations: ['users'] });
            await this.pubSub.publish(Enums.SUBSCRIPTION.NEW_SDP, { server, data, sdpType: sdp.type });

            return true;
        } catch (e) {
            Exceptions.serverError();
        }
    }

    async sendIceCandidate(data: Inputs.IceCandidate) {
        try {
            const server = await this.gameServerQueryService.getServerById(data.serverId, { relations: ['users'] });
            await this.pubSub.publish(Enums.SUBSCRIPTION.NEW_ICE_CANDIDATE, { server, data });

            return true;
        } catch (e) {
            Exceptions.serverError();
        }
    }
}

export default GameServersMutationsService;
