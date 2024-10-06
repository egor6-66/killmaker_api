import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Not, Repository } from 'typeorm';
import UsersService from 'users/users.service';

import GameServer from '../game-servers.model';

@Injectable()
class GameServersQueriesService {
    constructor(
        @InjectRepository(GameServer) private gameServersRepo: Repository<GameServer>,
        private readonly userService: UsersService
    ) {}

    async getViewerServers(req) {
        const id = await this.userService.getId(req);

        return await this.gameServersRepo
            .createQueryBuilder()
            .loadRelationCountAndMap('GameServer.usersCount', 'GameServer.users')
            .leftJoinAndSelect('GameServer.map', 'map')
            .where({ owner: { id } })
            .getMany();
    }

    async getAllServers(req) {
        const user = await this.userService.getUser(req);

        return await this.gameServersRepo
            .createQueryBuilder()
            .loadRelationCountAndMap('GameServer.usersCount', 'GameServer.users')
            .leftJoinAndSelect('GameServer.owner', 'User')
            .leftJoinAndSelect('GameServer.map', 'map')
            .where({ owner: Not(user.id) })
            .getMany();
    }

    async getServerById(id: number, findOptions?: FindOneOptions<GameServer>) {
        return await this.gameServersRepo.findOne({ where: { id }, ...findOptions });
    }
}

export default GameServersQueriesService;
