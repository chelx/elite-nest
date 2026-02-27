# Multi-tenant Cache ⚡

EliteNest provides a high-performance caching service backed by **Redis**, which automatically enforces tenant isolation.

## Key Features
- **Tenant-isolated**: Keys are automatically prefixed with the current `tenantId`.
- **Type-safe**: Generic methods for getting and setting data.
- **TTL Support**: Built-in TTL (Time To Live) for automatic cache invalidation.

## Usage

Inject the `CacheService` into your class:

```typescript
constructor(private readonly cache: CacheService) {}
```

### Setting and Getting Data

The service automatically detects the active tenant context using `AsyncLocalStorage`.

```typescript
// Key becomes 'tenant-1:user:profile:123'
await this.cache.set('user:profile:123', { name: 'John' }, 3600);

const profile = await this.cache.get('user:profile:123');
```

## Advanced Operations

- `cache.del(key)`: Manually invalidate a specific key.
- `cache.reset()`: Clear ALL cache for the **current tenant only**.

## Configuration

The cache is configured globally through the `FrameworkModule`. You can set the Redis connection parameters in your `.env` file:

```bash
REDIS_URL=redis://localhost:6379
CACHE_TTL=3600
```
