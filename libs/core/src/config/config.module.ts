import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import { configSchema } from './config.schema';

@Global()
@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            validate: (config) => {
                const result = configSchema.safeParse(config);
                if (!result.success) {
                    console.error('❌ Invalid environment variables:', result.error.format());
                    throw new Error('Invalid environment variables');
                }
                return result.data;
            },
        }),
    ],
    providers: [ConfigService],
    exports: [ConfigService],
})
export class ConfigModule { }
