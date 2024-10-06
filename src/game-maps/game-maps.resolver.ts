import { Query, Resolver } from '@nestjs/graphql';

import GameMap from './game-maps.model';
import GameMapsService from './game-maps.service';
import { Enums } from './utils';

@Resolver()
class GameMapsResolver {
    constructor(private gameMapsService: GameMapsService) {}

    @Query(() => [GameMap], { nullable: true, name: Enums.QUERY.GAME_MAPS })
    async getAllMaps() {
        return await this.gameMapsService.getAllMaps();
    }
}

export default GameMapsResolver;
