import { PrismaService } from '../prisma.service';

export abstract class Seeder {
    abstract run(prisma: PrismaService): Promise<void>;
}
