import { Injectable } from '@nestjs/common';
import { BaseRepository, PrismaService } from '@elitenest/core';
import { Product } from '@prisma/client';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
    constructor(prisma: PrismaService) {
        super(prisma, 'Product');
    }
}