import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { StorageService } from './storage/storage.service';
import { CacheService } from './cache/cache.service';
import { ConfigModule } from './config/config.module';

@Global()
@Module({
    imports: [
        ConfigModule,
        CacheModule.register({
            ttl: 600, // default ttl
        }),
    ],
    providers: [StorageService, CacheService],
    exports: [StorageService, CacheService],
})
export class FrameworkModule { }
