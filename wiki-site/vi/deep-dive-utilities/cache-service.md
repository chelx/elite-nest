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

const profile = await this.cache.get('user:profile:123');
```

## Tra cứu API

| Phương thức | Tham số | Kiểu trả về | Mô tả |
| :--- | :--- | :--- | :--- |
| `get<T>(key: string)` | `key` | `Promise<T \| null>` | Lấy giá trị từ cache. Tự động thêm tiền tố `tenantId`. |
| `set<T>(key, val, ttl?)` | `key`, `value`, `ttl` (giây) | `Promise<void>` | Lưu giá trị vào cache với thời gian sống (TTL) tùy chọn. |
| `del(key: string)` | `key` | `Promise<void>` | Xóa một key cụ thể khỏi cache. |
| `reset()` | không | `Promise<void>` | Xóa tất cả các key thuộc về tenant hiện tại. |

## Các thao tác nâng cao

- `cache.del(key)`: Xóa thủ công một key cụ thể.
- `cache.reset()`: Xóa TOÀN BỘ cache **chỉ dành cho tenant hiện tại**.

## Cấu hình

Hệ thống cache được cấu hình toàn cục thông qua `FrameworkModule`. Bạn có thể thiết lập các thông số kết nối Redis trong file `.env`:

```bash
REDIS_URL=redis://localhost:6379
CACHE_TTL=3600
```
