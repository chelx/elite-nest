import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ConfigService } from '../config/config.service.js';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(AppExceptionFilter.name);

    constructor(private config: ConfigService) { }

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();
        const request = ctx.getRequest<FastifyRequest>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const isProduction = this.config.get('NODE_ENV') === 'production';

        const originalMessage =
            exception instanceof HttpException
                ? exception.getResponse()
                : 'Internal server error';

        // Redact details in production for server errors (500+)
        const message = isProduction && status >= 500
            ? 'Internal server error'
            : originalMessage;

        const errorResponse = {
            success: false,
            error: {
                code: (message as any).code || 'INTERNAL_ERROR',
                message: (message as any).message || message,
                details: isProduction && status >= 500 ? null : (message as any).details || null,
            },
            meta: {
                timestamp: new Date().toISOString(),
                path: request.url,
            },
        };

        if (status >= 500) {
            this.logger.error(
                `${request.method} ${request.url}`,
                exception.stack,
                'AppExceptionFilter'
            );
        }

        response.status(status).send(errorResponse);
    }
}
