import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Storages } from '../utils/types';

import FBService from './fb.service';
import SelectelService from './selectel.service';

@Injectable()
class StorageService {
    constructor(
        private readonly configService: ConfigService,
        private readonly selectelService: SelectelService,
        private readonly fbService: FBService
    ) {}

    get(storageName: Storages, patch: string, res: Response) {
        switch (storageName) {
            case 'FB':
                return this.fbService.get(patch, res);

            case 'SELECTEL':
                return this.selectelService.get(patch);
        }
    }
}

export default StorageService;
