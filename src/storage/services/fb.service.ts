import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { enums } from 'utils';

@Injectable()
class FBService {
    storage;

    firebaseConfig = {
        apiKey: this.configService.get(enums.Env.FB_API_KEY),
        authDomain: 'deathmatch-23138.firebaseapp.com',
        projectId: 'deathmatch-23138',
        storageBucket: this.configService.get(enums.Env.FB_BUCKET),
        messagingSenderId: '551001820810',
        appId: this.configService.get(enums.Env.FB_APP_ID),
        measurementId: this.configService.get(enums.Env.FB_MSR),
    };

    constructor(private readonly configService: ConfigService) {
        this.auth();
        this.get('[');
    }

    private async auth() {
        const app = initializeApp(this.firebaseConfig);
        this.storage = getStorage(app);
    }

    async get(fileId: string, response?: Response) {
        return {};
    }
}

export default FBService;
