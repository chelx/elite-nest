import { AbilityBuilder, PureAbility, Subject } from '@casl/ability';
import { createPrismaAbility, PrismaQuery } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Post, User, Tenant } from '@prisma/client';

export type Subjects = Subject<Post> | Subject<User> | Subject<Tenant> | 'all';
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';

export type AppAbility = PureAbility<[Actions, Subjects], PrismaQuery>;

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: any) {
        const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

        if (user.roles?.includes('ADMIN')) {
            can('manage', 'all');
        } else {
            can('read', 'all');

            // Ownership rules - using string literals for model names as CASL/Prisma expects
            can('update', 'Post' as any, { authorId: user.id } as any);
            can('delete', 'Post' as any, { authorId: user.id } as any);

            can('manage', 'User' as any, { id: user.id } as any);
        }

        // Global constraints
        cannot('manage', 'all', { tenantId: { not: user.tenantId } } as any).because('Tenant mismatch');

        return build();
    }
}
