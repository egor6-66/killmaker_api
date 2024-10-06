import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Query, Resolver } from '@nestjs/graphql';
import { Guards } from '@utils';

import GameServer from '../game-servers.model';
import GameServersQueryService from '../services/queries.service';
import { Enums } from '../utils';

@UseGuards(Guards.AuthJwt)
@Resolver()
class GameServersQueriesResolver {
    constructor(private gameServersQueryService: GameServersQueryService) {}

    @Query(() => [GameServer], { nullable: true, name: Enums.QUERY.VIEWER_SERVERS })
    async getViewerServers(@Context() context: any) {
        return await this.gameServersQueryService.getViewerServers(context.req);
    }

    @Query(() => [GameServer], { nullable: true, name: Enums.QUERY.ALL_SERVERS })
    async getAllServers(@Context() context: any) {
        return await this.gameServersQueryService.getAllServers(context.req);
    }

    @Query(() => GameServer, { nullable: true, name: Enums.QUERY.SERVER })
    async getServer(@Args('id', { type: () => Int }) id: number) {
        return await this.gameServersQueryService.getServerById(id, { relations: ['owner', 'users', 'map'] });
    }
}

export default GameServersQueriesResolver;
