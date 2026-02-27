import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { Config } from './config.schema';

@Injectable()
export class ConfigService {
    constructor(private configService: NestConfigService<Config, true>) { }

    get<T extends keyof Config>(key: T): Config[T] {
        return this.configService.get(key, { infer: true });
    }

    get isDevelopment(): boolean {
        return this.get('NODE_ENV') === 'development';
    }

    get isProduction(): boolean {
        return this.get('NODE_ENV') === 'production';
    }

    get isTest(): boolean {
        return this.get('NODE_ENV') === 'test';
    }
}
