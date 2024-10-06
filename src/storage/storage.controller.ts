import { Controller, Get, Param, Res } from '@nestjs/common';

import StorageService from './services';

@Controller('storage')
class StorageController {
    constructor(private storageService: StorageService) {}

    @Get('game_map/:filePath')
    async downloadMedia(@Param('filePath') filePath: string, @Res() res: any) {
        const file: any = await this.storageService.get('FB', filePath, res);

        // res.setHeader('Content-Type', file.type);
        // res.setHeader('Cache-Control', 'max-age=60d');
        // res.end(file.blob);

        //
        // try {
        //     storageFile = await this.storageService.get('media/' + mediaId);
        // } catch (e) {
        //     if (e.message.toString().includes('No such object')) {
        //         throw new NotFoundException('image not found');
        //     } else {
        //         throw new ServiceUnavailableException('internal error');
        //     }
        // }
        // res.setHeader('Content-Type', storageFile.contentType);
        // res.setHeader('Cache-Control', 'max-age=60d');
        // res.end(storageFile.buffer);
    }
}

export default StorageController;
