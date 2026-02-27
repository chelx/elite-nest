import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import winston from 'winston';
import 'winston-daily-rotate-file';

export interface AuditLogEntry {
    userId?: string;
    tenantId?: string;
    action: string;
    model: string;
    modelId: string;
    changes?: any; // Will be mapped for DB
    ipAddress?: string;
    userAgent?: string;
}

export interface IAuditDriver {
    write(entry: AuditLogEntry): Promise<void>;
}

@Injectable()
export class DatabaseAuditDriver implements IAuditDriver {
    constructor(private prisma: PrismaService) { }

    async write(entry: AuditLogEntry): Promise<void> {
        await (this.prisma as any).auditLog.create({
            data: entry,
        });
    }
}

@Injectable()
export class FileAuditDriver implements IAuditDriver {
    private logger: winston.Logger;

    constructor(logPath: string) {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.DailyRotateFile({
                    filename: `${logPath}-%DATE%.log`,
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d',
                }),
            ],
        });
    }

    async write(entry: AuditLogEntry): Promise<void> {
        this.logger.info(entry.action, { ...entry });
    }
}
