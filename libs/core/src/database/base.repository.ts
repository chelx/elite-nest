import { PrismaService } from './prisma.service.js';
import { Prisma } from '@prisma/client';

export abstract class BaseRepository<
    T,
    CreateDto = any,
    UpdateDto = any
> {
    constructor(
        protected readonly prisma: PrismaService,
        protected readonly modelName: Prisma.ModelName
    ) { }

    /**
     * Helper to access the correct Prisma model with typed operations
     */
    protected get db() {
        return (this.prisma.client as any)[this.modelName.toLowerCase() as any];
    }

    async findMany(args?: any): Promise<T[]> {
        return this.db.findMany(args);
    }

    async findUnique(id: string): Promise<T | null> {
        return this.db.findUnique({ where: { id } });
    }

    async create(data: CreateDto): Promise<T> {
        return this.db.create({ data });
    }

    async update(id: string, data: UpdateDto): Promise<T> {
        return this.db.update({ where: { id }, data });
    }

    async softDelete(id: string): Promise<T> {
        return this.db.delete({ where: { id } });
    }

    async restore(id: string): Promise<T> {
        return this.db.update({
            where: { id },
            data: { deletedAt: null },
        });
    }
}
