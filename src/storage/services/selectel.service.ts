import { S3 } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
class SelectelService {
    private readonly client = new S3({
        credentials: {
            accessKeyId: '',
            secretAccessKey: '',
        },
        endpoint: '',
        region: 'ru-1',
    } as any);

    private readonly params = {
        Bucket: '',
        Key: '',
    };

    constructor(private readonly configService: ConfigService) {}

    get(patch: string) {
        console.log('wddad');
    }
}

export default SelectelService;
