# Security Hardening 🔒

EliteNest comes pre-configured with enterprise-grade security hardening to protect against common vulnerabilities and accidental data exposure.

## 1. PII Redaction in Logs

The `AuditService` includes a recursive redaction engine. Any object logged via the audit trail is scanned for sensitive keys and automatically masked.

```json
// Original Input
{
  "email": "admin@company.com",
  "password": "super-secret-password-123"
}

// Resulting Log Entry
{
  "email": "admin@company.com",
  "password": "********"
}
```

**Masked keywords**: `password`, `token`, `jwt`, `secret`, `apikey`, `key`.

## 2. Production Exception Handling

In development, detailed error stacks are helpful. In production, they are a liability. EliteNest's `AppExceptionFilter` automatically suppresses internal details for `500` series errors when `NODE_ENV=production`.

- **Development**: Returns full stack trace and internal Prisma errors.
- **Production**: Returns a generic `"Internal server error"` and a timestamped correlation ID for server-side debugging.

## 3. SQL Injection Prevention

By using **Prisma** as our primary ORM, EliteNest benefits from automatic query parameterization. We strictly discourage the use of raw SQL strings. If raw queries are necessary, our linting rules enforce the use of `$queryRaw` with template literals, which Prisma safely parameterizes.

## 4. Rate Limiting

EliteNest integrates with `fastify-rate-limit` (managed via `FrameworkModule`). You can configure global limits or endpoint-specific throttles in the `ConfigModule`.

```typescript
// config/config.schema.ts
RATE_LIMIT_MAX: z.number().default(100),
RATE_LIMIT_WINDOW: z.string().default('1 minute'),
```
