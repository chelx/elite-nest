import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { multiTenancyExtension } from './prisma-extensions';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
    public readonly client: any;

    constructor() {
        const baseClient = new PrismaClient();
        this.client = baseClient.$extends(multiTenancyExtension);

        // Proxy properties from internal client to this service for convenience
        return new Proxy(this, {
            get: (target, prop) => {
                if (prop in target) return (target as any)[prop];
                return (target.client as any)[prop];
            },
        });
    }

    async onModuleInit() {
        // Note: with Proxy, we might need to be careful about which $connect we call
        await (this.client as any).$connect();
    }

    async onModuleDestroy() {
        await (this.client as any).$disconnect();
    }
}
