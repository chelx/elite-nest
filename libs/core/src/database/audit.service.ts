import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '../config/config.service.js';
import { PrismaService } from './prisma.service.js';
import {
    IAuditDriver,
    DatabaseAuditDriver,
    FileAuditDriver,
    AuditLogEntry
} from './drivers/audit.driver.js';

export enum AuditAction {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}

@Injectable()
export class AuditService implements OnModuleInit {
    private readonly logger = new Logger(AuditService.name);
    private driver!: IAuditDriver;

    constructor(
        private config: ConfigService,
        private prisma: PrismaService
    ) { }

    onModuleInit() {
        const driverType = this.config.get('AUDIT_LOG_DRIVER') || 'database';

        if (driverType === 'file') {
            const logPath = this.config.get('AUDIT_LOG_PATH');
            this.driver = new FileAuditDriver(logPath);
            this.logger.log('Audit Log Driver: File');
        } else {
            this.driver = new DatabaseAuditDriver(this.prisma);
            this.logger.log('Audit Log Driver: Database');
        }
    }

    /**
     * Log an audit event asynchronously.
     * Does not wait for the driver to finish to avoid blocking the main thread.
     */
    log(params: {
        action: AuditAction;
        model: string;
        modelId: string;
        changes?: any;
        userId?: string;
        tenantId?: string;
        ipAddress?: string;
        userAgent?: string;
    }) {
        const entry: AuditLogEntry = {
            action: params.action,
            model: params.model,
            modelId: params.modelId,
            changes: this.redact(params.changes || {}),
            userId: params.userId,
            tenantId: params.tenantId,
            ipAddress: params.ipAddress,
            userAgent: params.userAgent,
        };

        // Fire and forget (async)
        this.driver.write(entry).catch((err) => {
            this.logger.error(`Failed to write audit log: ${err.message}`);
        });
    }

    /**
     * Redact sensitive fields from an object recursively.
     */
    private redact(obj: any): any {
        if (!obj || typeof obj !== 'object') return obj;

        const sensitiveFields = ['password', 'token', 'jwt', 'secret', 'apikey', 'key'];
        const redacted = { ...obj };

        for (const key of Object.keys(redacted)) {
            if (sensitiveFields.some((f) => key.toLowerCase().includes(f))) {
                redacted[key] = '********';
            } else if (typeof redacted[key] === 'object') {
                redacted[key] = this.redact(redacted[key]);
            }
        }

        return redacted;
    }
}
