import { forwardRef, Inject, Injectable } from '@nestjs/common';
import GameServersMutationsService from 'game-servers/services/mutations.servece';
import { CookieParser, Exceptions } from 'utils';

import UsersService from '../users/users.service';

@Injectable()
class PubSubService {
    constructor(
        private readonly userService: UsersService,
        @Inject(forwardRef(() => GameServersMutationsService)) private readonly gameServersMutationsService: GameServersMutationsService
    ) {}

    private async getUser(ctx) {
        const cookie = ctx.extra.request.headers.cookie;

        if (cookie) {
            const accessToken = CookieParser.get(ctx.extra.request.headers.cookie, 'accessToken');
            const refreshToken = CookieParser.get(ctx.extra.request.headers.cookie, 'refreshToken');

            if (!accessToken) {
                Exceptions.unauthorized();
            }

            return accessToken;
        }
    }

    async onConnect(ctx: any) {
        const accessToken = await this.getUser(ctx);
        const req = { cookies: { accessToken } } as any;
        ctx.extra.user = await this.userService.onDisconnect(req);
    }

    async onDisconnect(ctx: any) {
        const accessToken = await this.getUser(ctx);
        const req = { cookies: { accessToken } } as any;
        const user = await this.userService.onDisconnect(req);

        if (user.activeServer) {
            await this.gameServersMutationsService.leaveServer(user.activeServer.id, req);
        }

        ctx.extra.user = null;
    }
}

export default PubSubService;
