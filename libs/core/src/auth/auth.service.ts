import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private passwordService: PasswordService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await (this.prisma as any).user.findUnique({
            where: { email },
        });

        if (user && (await this.passwordService.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            email: user.email,
            sub: user.id,
            tenantId: user.tenantId
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
