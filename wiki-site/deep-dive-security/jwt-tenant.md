# JWT & Tenant Strategies 🔑

Authentication in EliteNest is inherently tenant-aware. Every token implicitly carries the context of who the user is AND which silo they belong to.

## Token Payload

An EliteNest JWT payload contains:
- `sub`: User ID
- `tenantId`: The ID of the current tenant session
- `iat` / `exp`: Issued at / Expiration times

## The JwtStrategy

The heart of our authentication is the `JwtStrategy`. Unlike standard implementations, it doesn't just return a user object; it **locks the request into a tenant context**.

```typescript
// libs/core/src/auth/strategies/jwt.strategy.ts

async validate(payload: any) {
    const { sub, tenantId } = payload;
    
    // 1. Verify user exists and belongs to the specified tenant
    const user = await this.prisma.user.findUnique({
        where: { id: sub, tenantId }
    });

    if (!user) throw new UnauthorizedException();

    // 2. Inject context for the rest of the request
    // Subsequent DB calls will automatically filter by this tenantId
    runInTenantContext(tenantId, () => {
        // ... proceeding request
    });

    return user;
}
```

## Security Benefits

1.  **In-Token Isolation**: By encoding `tenantId` in the token, we prevent "Proxy" attacks where a user might try to use a valid token for one tenant to access another's data.
2.  **Stateless Context**: The server doesn't need to look up the tenant in every request; it's trusted via the JWT signature.
3.  **Cross-Library Safety**: The `AsyncLocalStorage` context propagates through all dependencies, including third-party plugins.
