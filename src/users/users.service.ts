import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { FindOneOptions, Repository } from 'typeorm';

import { ClientApp } from '../client-app';

import User from './users.model';
import { UserDto } from './utils';

@Injectable()
class UsersService {
    constructor(
        @InjectRepository(User) private usersRepo: Repository<User>,
        private jwtService: JwtService
    ) {}

    async createUser(user: { nickname: string; password: string }) {
        const newUser = await this.usersRepo.create({ ...user, clientApp: new ClientApp() });
        await this.usersRepo.save(newUser);

        return newUser;
    }

    async getUserBy(data: UserDto.GetUser) {
        return await this.usersRepo.findOneBy(data);
    }

    async getUser(req: Request, findOptions?: FindOneOptions<User>) {
        const id = await this.getId(req);

        return await this.usersRepo.findOne({ ...findOptions, where: { ...findOptions?.where, id } });
    }

    async getId(req: Request) {
        const data = await this.jwtService.decode(req.cookies['accessToken']);

        return data.id;
    }

    async onConnect(req: Request) {
        const user = await this.getUser(req);
        await this.usersRepo.createQueryBuilder().update(User).set({ isOnline: true }).where('id = :id', { id: user.id }).execute();

        return user;
    }

    async onDisconnect(req: Request) {
        const user = await this.getUser(req, { relations: ['activeServer'] });
        await this.usersRepo.createQueryBuilder().update(User).set({ isOnline: false }).where('id = :id', { id: user.id }).execute();

        return user;
    }

    async save(user: User) {
        return await this.usersRepo.save(user);
    }
}

export default UsersService;
