# Soft-delete Implementation 🗑️

In enterprise applications, data is rarely truly deleted. EliteNest provides a built-in soft-delete mechanism that is transparent to the developer.

## The Mechanism

The system uses a `deletedAt` timestamp field on models. If this field is non-null, the record is considered "deleted".

### Automated Filtering

Similar to multi-tenancy, our Prisma Extension intercepts all find operations to ensure deleted records are hidden by default.

```typescript
// Transparent Filtering
const products = await this.productRepository.findMany(); // Only returns non-deleted items
```

### Intercepting Deletes

When `client.delete()` or `client.deleteMany()` is called, the framework intercepts the command and transforms it into an `update` operation that sets the `deletedAt` field to the current timestamp.

## Restoring Data

If you need to un-delete a record, the `BaseRepository` provides a `restore` method:

```typescript
await this.repository.restore(id);
```

This simply sets `deletedAt` back to `null`.

## Advanced: Including Deleted Items

Occasionally, for reports or administrative views, you may need to see deleted items. You can bypass the protection by using the `includeDeleted` flag (if implemented in your specific repository logic) or by using the raw Prisma client directly.

> [!IMPORTANT]
> By default, ALL repositories extending `BaseRepository` will enforce soft-delete behavior. Ensure your Prisma models include a `deletedAt DateTime?` field.
