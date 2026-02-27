# Cơ chế Soft-delete 🗑️

Trong các ứng dụng doanh nghiệp, dữ liệu hiếm khi thực sự bị xóa hoàn toàn. EliteNest cung cấp cơ chế soft-delete (xóa mềm) tích hợp sẵn và minh bạch với lập trình viên.

## Cơ chế hoạt động

Hệ thống sử dụng một trường timestamp `deletedAt` trong các model. Nếu trường này khác null, bản ghi đó được coi là đã bị "xóa".

### Tự động Lọc

Tương tự như multi-tenancy, Prisma Extension của chúng ta sẽ can thiệp vào tất cả các thao tác tìm kiếm để đảm bảo các bản ghi đã xóa được ẩn đi theo mặc định.

```typescript
// Lọc minh bạch
const products = await this.productRepository.findMany(); // Chỉ trả về các item chưa bị xóa
```

### Chặn thao tác Xóa

Khi `client.delete()` hoặc `client.deleteMany()` được gọi, framework sẽ chặn lệnh đó và chuyển đổi nó thành một thao tác `update` để thiết lập giá trị cho trường `deletedAt`.

## Khôi phục Dữ liệu

Nếu bạn cần khôi phục một bản ghi đã xóa, `BaseRepository` cung cấp phương thức `restore`:

```typescript
await this.repository.restore(id);
```

Lệnh này đơn giản là thiết lập `deletedAt` về lại `null`.

## Nâng cao: Xem cả Dữ liệu đã xóa

Trong một số trường hợp nhất định như báo cáo hoặc chế độ xem admin, bạn có thể cần xem cả các bản ghi đã xóa. Bạn có thể bỏ qua lớp bảo vệ bằng cách sử dụng flag `includeDeleted` (nếu được triển khai trong logic repository cụ thể của bạn) hoặc sử dụng trực tiếp raw Prisma client.

> [!IMPORTANT]
> Theo mặc định, TẤT CẢ các repository kế thừa từ `BaseRepository` sẽ thực thi hành vi soft-delete. Đảm bảo các Prisma model của bạn có trường `deletedAt DateTime?`.
