# Caching đa người dùng ⚡

EliteNest cung cấp một dịch vụ caching hiệu năng cao dựa trên **Redis**, tự động thực thi việc cô lập dữ liệu giữa các tenant.

## Các tính năng chính
- **Cô lập theo Tenant**: Các key được tự động gắn thêm tiền tố là `tenantId` hiện tại.
- **Type-safe**: Các phương thức generic để lấy và lưu dữ liệu an toàn.
- **Hỗ trợ TTL**: Tích hợp sẵn thời gian sống (Time To Live) để tự động xóa cache hết hạn.

## Cách sử dụng

Inject `CacheService` vào class của bạn:

```typescript
constructor(private readonly cache: CacheService) {}
```

### Lưu và Lấy dữ liệu

Dịch vụ tự động nhận diện bối cảnh tenant hiện tại bằng `AsyncLocalStorage`.

```typescript
// Key sẽ trở thành 'tenant-1:user:profile:123'
await this.cache.set('user:profile:123', { name: 'John' }, 3600);

const profile = await this.cache.get('user:profile:123');
```

## Các thao tác nâng cao

- `cache.del(key)`: Xóa thủ công một key cụ thể.
- `cache.reset()`: Xóa TOÀN BỘ cache **chỉ dành cho tenant hiện tại**.

## Cấu hình

Hệ thống cache được cấu hình toàn cục thông qua `FrameworkModule`. Bạn có thể thiết lập các thông số kết nối Redis trong file `.env`:

```bash
REDIS_URL=redis://localhost:6379
CACHE_TTL=3600
```
