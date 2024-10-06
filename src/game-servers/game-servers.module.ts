import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import GameMapsModule from 'game-maps/game-maps.module';

import PubSubModule from '../pubSub/pubSub.module';
import UsersModule from '../users/users.module';

import GameServer from './game-servers.model';
import Resolvers from './resolvers';
import Services from './services';

@Module({
    providers: [...Services, ...Resolvers],
    imports: [TypeOrmModule.forFeature([GameServer]), UsersModule, forwardRef(() => PubSubModule), ConfigModule, GameMapsModule],
    exports: [...Services],
})
class GameServersModule {}

export default GameServersModule;
