import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import process from 'process';

import UsersModule from '../users/users.module';

import AuthController from './auth.controller';
import AuthService from './auth.service';
import { AuthStrategy } from './utils';

@Module({
    providers: [AuthService, AuthStrategy.Local, AuthStrategy.Jwt, AuthStrategy.RefreshJwt],
    controllers: [AuthController],
    imports: [
        JwtModule.register({
            secret: `${process.env.GWT_SECRET}`,
        }),
        UsersModule,
    ],
})
class AuthModule {}

export default AuthModule;
