# RBAC with CASL 🛡️

EliteNest uses the **CASL** (Complementary Access Control Layer) library to define and enforce fine-grained authorization rules.

## Why CASL?

While standard RBAC (Roles) is good for "Who you are", CASL excels at "What you can do with specific pieces of data" (ABAC/Ownership).

## Defining Abilities

Abilities are defined in the `CaslAbilityFactory`. You can define rules based on the user's role and their tenant context.

```typescript
// libs/core/src/auth/casl/casl-ability.factory.ts

if (user.roles?.includes('ADMIN')) {
    can('manage', 'all'); // Admins can do anything
} else {
    can('read', 'all'); // Regular users can read everything
    
    // Ownership rules: Only authors can update their posts
    can('update', 'Post', { authorId: user.id });
}
```

## Enforcing Policies

To protect an endpoint, use the `@CheckPolicies()` decorator combined with the `PoliciesGuard`.

```typescript
@Get(':id')
@CheckPolicies((ability) => ability.can('read', 'Post'))
findOne(@Param('id') id: string) {
    return this.service.findOne(id);
}
```

## Object-level Security

EliteNest also provides a `PolicyHandler` interface for more complex checks that require loading the actual record from the database before verifying permissions.

### Multi-tenant Safeguard
The framework enforces a global `cannot` rule: a user can NEVER manage data belonging to a different `tenantId`, regardless of their role.

```typescript
cannot('manage', 'all', { tenantId: { not: user.tenantId } });
```
