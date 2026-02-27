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

const profile = await this.cache.get('user:profile:123');
```

## API Reference

| Method | Parameters | Return Type | Description |
| :--- | :--- | :--- | :--- |
| `get<T>(key: string)` | `key` | `Promise<T \| null>` | Retrieves a value from the cache. Automatically appends `tenantId` prefix. |
| `set<T>(key, val, ttl?)` | `key`, `value`, `ttl` (seconds) | `Promise<void>` | Stores a value in the cache with an optional TTL. |
| `del(key: string)` | `key` | `Promise<void>` | Removes a specific key from the cache. |
| `reset()` | none | `Promise<void>` | Clears all keys belonging to the current tenant. |

## Advanced Operations

- `cache.del(key)`: Manually invalidate a specific key.
- `cache.reset()`: Clear ALL cache for the **current tenant only**.

## Configuration

The cache is configured globally through the `FrameworkModule`. You can set the Redis connection parameters in your `.env` file:

```bash
REDIS_URL=redis://localhost:6379
CACHE_TTL=3600
```
