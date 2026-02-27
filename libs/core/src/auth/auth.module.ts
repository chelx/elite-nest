import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { DatabaseModule } from '../database/database.module';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CaslAbilityFactory } from './casl/casl-ability.factory';
import { PoliciesGuard } from './guards/policies.guard';

@Global()
@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get('JWT_EXPIRES_IN') as any,
                },
            }),
            inject: [ConfigService],
        }),
        DatabaseModule,
    ],
    providers: [
        AuthService,
        PasswordService,
        JwtStrategy,
        JwtAuthGuard,
        CaslAbilityFactory,
        PoliciesGuard
    ],
    exports: [
        AuthService,
        PasswordService,
        JwtAuthGuard,
        CaslAbilityFactory,
        PoliciesGuard
    ],
})
export class AuthModule { }
