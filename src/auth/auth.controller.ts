import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Guards } from '@utils';

import AuthService from './auth.service';
import { Inputs } from './utils';

@Controller('auth')
class AuthController {
    constructor(private authService: AuthService) {}

    @Post('registration')
    async registration(@Body() data: Inputs.Auth, @Res() res: Response) {
        await this.authService.registration(data, res);

        return res.json();
    }

    @UseGuards(Guards.AuthLocal)
    @Post('login')
    async login(@Body() data: Inputs.Auth, @Res() response) {
        const res = await this.authService.login(data, response);

        return response.json(res);
    }

    @Get('logout')
    async logout(@Res() res: Response, @Req() req: Request) {
        await this.authService.logout(res, req);

        return res.json();
    }

    @UseGuards(Guards.RefreshJwt)
    @Get('refreshToken')
    async refreshToken(@Res() res: Response, @Req() req: any) {
        await this.authService.refreshToken(req.cookies.refreshToken, res);

        return !!(await this.authService.refreshToken(req.cookies.refreshToken, res));
    }
}

export default AuthController;
