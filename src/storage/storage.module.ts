import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import FBService from './services/fb.service';
import SelectelService from './services/selectel.service';
import StorageService from './services';
import StorageController from './storage.controller';

@Module({
    providers: [StorageService, FBService, SelectelService, ConfigService],
    exports: [StorageService],
    controllers: [StorageController],
})
class StorageModule {}

export default StorageModule;
