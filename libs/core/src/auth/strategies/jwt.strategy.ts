import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '../../config/config.service';
import { PrismaService } from '../../database/prisma.service';
import { runInTenantContext } from '../../database/context/tenant.context';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        config: ConfigService,
        private prisma: PrismaService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        const { sub: userId, tenantId } = payload;

        if (!userId || !tenantId) {
            throw new UnauthorizedException('Invalid token payload');
        }

        // Wrap the validation (and subsequent request handling) in the tenant context
        return runInTenantContext(tenantId, async () => {
            const user = await (this.prisma as any).user.findUnique({
                where: { id: userId },
                include: { tenant: true },
            });

            if (!user || user.tenantId !== tenantId) {
                throw new UnauthorizedException('User not found or tenant mismatch');
            }

            return {
                id: user.id,
                email: user.email,
                tenantId: user.tenantId,
                roles: [], // To be implemented with RBAC
            };
        });
    }
}
