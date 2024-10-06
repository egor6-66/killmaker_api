import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import GameMap from './game-maps.model';
import GameMapsResolver from './game-maps.resolver';
import GameMapsService from './game-maps.service';

@Module({
    providers: [GameMapsResolver, GameMapsService],
    imports: [TypeOrmModule.forFeature([GameMap])],
    exports: [GameMapsService],
})
class GameMapsModule {}

export default GameMapsModule;
