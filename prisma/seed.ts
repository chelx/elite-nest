import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
// Optional: import { PrismaService } from '../libs/core/src/database/prisma.service';

async function main() {
    // Simple seed script for development
    const prisma = new PrismaClient();

    console.log('🌱 Seeding database...');

    const tenant = await prisma.tenant.upsert({
        where: { slug: 'system' },
        update: {},
        create: {
            name: 'System Tenant',
            slug: 'system',
        },
    });

    await prisma.user.upsert({
        where: { email: 'admin@elitenest.io' },
        update: {},
        create: {
            email: 'admin@elitenest.io',
            name: 'Super Admin',
            password: 'hashed_password', // Should be hashed in real apps
            tenantId: tenant.id,
        },
    });

    console.log('✅ Seeding complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // await prisma.$disconnect();
    });
