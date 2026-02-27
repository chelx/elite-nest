import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { getTenantId } from '../database/context/tenant.context';

@Injectable()
export class CacheService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) { }

    private getTenantPrefix(): string {
        const tenantId = getTenantId();
        return tenantId ? `tenant:${tenantId}:` : 'global:';
    }

    async get<T>(key: string): Promise<T | undefined> {
        const fullKey = `${this.getTenantPrefix()}${key}`;
        return this.cacheManager.get<T>(fullKey);
    }

    async set(key: string, value: any, ttl?: number): Promise<void> {
        const fullKey = `${this.getTenantPrefix()}${key}`;
        await this.cacheManager.set(fullKey, value, ttl);
    }

    async del(key: string): Promise<void> {
        const fullKey = `${this.getTenantPrefix()}${key}`;
        await this.cacheManager.del(fullKey);
    }

    async reset(): Promise<void> {
        await (this.cacheManager as any).reset();
    }
}
