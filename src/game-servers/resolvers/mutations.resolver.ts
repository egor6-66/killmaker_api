import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { Guards } from '@utils';

import GameServer from '../game-servers.model';
import GameServersMutationsService from '../services/mutations.servece';
import { Enums, Inputs } from '../utils';

@UseGuards(Guards.AuthJwt)
@Resolver()
class GameServersMutationsResolver {
    constructor(private gameServersMutationsService: GameServersMutationsService) {}

    @Mutation(() => GameServer, { nullable: true, name: Enums.MUTATION.CREATE_SERVER })
    async createServer(@Args('data') data: Inputs.CreateServer, @Context() context: any) {
        return await this.gameServersMutationsService.createServer(data, context.req);
    }

    @Mutation(() => Boolean, { name: Enums.MUTATION.JOIN_SERVER })
    async joinServer(@Args('id', { type: () => Int }) id: number, @Context() context: any) {
        return await this.gameServersMutationsService.joinServer(id, context.req);
    }

    @Mutation(() => Boolean, { name: Enums.MUTATION.LEAVE_SERVER })
    async leaveServer(@Args('id', { type: () => Int }) id: number, @Context() context: any) {
        return await this.gameServersMutationsService.leaveServer(id, context.req);
    }

    @Mutation(() => Boolean, { name: Enums.MUTATION.SEND_SDP })
    async sendSdp(@Args('data') data: Inputs.SDP) {
        return await this.gameServersMutationsService.sendSdp(data);
    }

    @Mutation(() => Boolean, { name: Enums.MUTATION.SEND_ICE_CANDIDATE })
    async sendIceCandidate(@Args('data') data: Inputs.IceCandidate) {
        return await this.gameServersMutationsService.sendIceCandidate(data);
    }
}

export default GameServersMutationsResolver;
