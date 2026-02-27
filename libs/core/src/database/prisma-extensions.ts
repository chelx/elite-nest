import { Prisma } from '@prisma/client';
import { getTenantId } from './context/tenant.context.js';

/**
 * Advanced Prisma Extension for EliteNest
 * Provides:
 * 1. Automatic Multi-tenancy isolation (shared database)
 * 2. Transparent Soft-delete (deletedAt filter and interceptor)
 */
export const multiTenancyExtension = Prisma.defineExtension((client) => {
    return client.$extends({
        query: {
            $allModels: {
                async $allOperations({ model, operation, args, query }) {
                    const tenantId = getTenantId();

                    // Type-safe handling of arguments
                    const modifiedArgs = args as {
                        where?: Record<string, any>;
                        data?: Record<string, any>;
                        [key: string]: any;
                    };

                    // 1. Multi-tenancy logic
                    // Models that include 'tenantId' field will have it automatically injected
                    if (tenantId) {
                        modifiedArgs.where = { ...modifiedArgs.where, tenantId };

                        // If it's a create operation, ensure tenantId is set in data
                        if (operation === 'create' || operation === 'createMany') {
                            if (Array.isArray(modifiedArgs.data)) {
                                modifiedArgs.data = modifiedArgs.data.map(item => ({ ...item, tenantId }));
                            } else {
                                modifiedArgs.data = { ...modifiedArgs.data, tenantId };
                            }
                        }
                    }

                    // 2. Soft-delete logic
                    // Auto-filter deleted records for read operations
                    if (['findMany', 'findFirst', 'findUnique', 'count', 'groupBy', 'aggregate'].includes(operation)) {
                        modifiedArgs.where = { ...modifiedArgs.where, deletedAt: null };
                    }

                    // Intercept delete to perform update instead
                    if (operation === 'delete') {
                        return (client as any)[model].update({
                            where: modifiedArgs.where,
                            data: { deletedAt: new Date() },
                        });
                    }

                    if (operation === 'deleteMany') {
                        return (client as any)[model].updateMany({
                            where: modifiedArgs.where,
                            data: { deletedAt: new Date() },
                        });
                    }

                    return query(modifiedArgs);
                },
            },
        },
    });
});
