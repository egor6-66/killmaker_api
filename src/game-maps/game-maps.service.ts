import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import GameMap from './game-maps.model';

@Injectable()
class GameMapsService {
    constructor(@InjectRepository(GameMap) private gameMapsRepo: Repository<GameMap>) {}

    async getAllMaps() {
        const a = await this.gameMapsRepo.find();
        console.log(a);

        return a;
    }

    async getMapById(id: number) {
        return await this.gameMapsRepo.findOneBy({ id });
    }
}

export default GameMapsService;
