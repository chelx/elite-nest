# Base Repository Pattern 🏛️

EliteNest uses a generic Base Repository pattern to abstract common persistence logic, provide type safety, and enforce global constraints.

## Why use BaseRepository?

Instead of injecting the Prisma client directly into services, we use repositories to:
1.  **Encapsulate Query Logic**: Keep services clean of database specifics.
2.  **Enforce Multi-tenancy**: Ensure every query is filtered by `tenantId`.
3.  **Support Soft-deletion**: Automatically handle the `deletedAt` logic.
4.  **Type Safety**: Leverage TypeScript generics for CRUD operations.

## Basic Usage

When you generate a component with the CLI, it creates a repository extending `BaseRepository<T>`:

```typescript
@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(prisma: PrismaService) {
    super(prisma, 'Product'); // 'Product' is the Prisma model name
  }
}
```

## Standard Methods

The `BaseRepository` provides the following methods out of the box:

- `findMany(params)`: Find multiple records (automatically filtered).
- `findUnique(id)`: Find a single record by its ID.
- `create(data)`: Create a new record (automatically injects `tenantId`).
- `update(id, data)`: Update an existing record.
- `softDelete(id)`: Mark a record as deleted.
- `restore(id)`: Recover a deleted record.

## API Reference

| Method | Parameters | Return Type | Description |
| :--- | :--- | :--- | :--- |
| `findMany(args?)` | `Prisma.Args` | `Promise<T[]>` | Finds multiple records. Automatically filters by `tenantId` and `deletedAt`. |
| `findUnique(id)` | `string` | `Promise<T \| null>` | Finds a single record by ID. |
| `create(data)` | `Partial<T>` | `Promise<T>` | Creates a new record. Automatically injects `tenantId`. |
| `update(id, data)` | `id`, `Partial<T>` | `Promise<T>` | Updates an existing record by ID. |
| `softDelete(id)` | `string` | `Promise<T>` | Sets `deletedAt` to current timestamp. |
| `restore(id)` | `string` | `Promise<T>` | Resets `deletedAt` to `null`. |

## Example: Custom Query

If you need a custom query, you can access the underlying Prisma model directly while still benefiting from automatic filtering:

```typescript
async findFeatured() {
  return this.model.findMany({
    where: { isFeatured: true }
  });
}
```

> [!NOTE]
> The `this.model` getter in `BaseRepository` is proxied through our multi-tenancy extension, so you don't need to manually add `tenantId` to your `where` clauses.
