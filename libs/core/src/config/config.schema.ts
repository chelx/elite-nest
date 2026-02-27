import { z } from 'zod';

export const configSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string().url(),
    REDIS_URL: z.string().url(),
    JWT_SECRET: z.string().min(32),
    JWT_EXPIRES_IN: z.string().default('1h'),
    AUDIT_LOG_DRIVER: z.enum(['database', 'file']).default('database'),
    AUDIT_LOG_PATH: z.string().default('logs/audit'),
    STORAGE_DRIVER: z.enum(['local', 's3']).default('local'),
});

export type Config = z.infer<typeof configSchema>;
