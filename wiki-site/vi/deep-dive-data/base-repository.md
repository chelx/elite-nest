# Pattern Base Repository 🏛️

EliteNest sử dụng pattern Base Repository generic để trừu tượng hóa các logic truy vấn chung, đảm bảo an toàn về kiểu dữ liệu và thực thi các ràng buộc hệ thống.

## Tại sao nên dùng BaseRepository?

Thay vì inject trực tiếp Prisma client vào các service, chúng ta sử dụng repository để:
1.  **Đóng gói Logic Truy vấn**: Giữ cho các service sạch sẽ, không phụ thuộc vào chi tiết của database.
2.  **Thực thi Multi-tenancy**: Đảm bảo mọi truy vấn đều được lọc theo `tenantId`.
3.  **Hỗ trợ Soft-deletion**: Tự động xử lý logic ẩn các bản ghi đã xóa (`deletedAt`).
4.  **An toàn Kiểu dữ liệu (Type Safety)**: Tận dụng TypeScript generics cho các thao tác CRUD.

## Cách sử dụng Cơ bản

Khi bạn tạo một module bằng CLI, nó sẽ tạo ra một repository kế thừa từ `BaseRepository<T>`:

```typescript
@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(prisma: PrismaService) {
    super(prisma, 'Product'); // 'Product' là tên model trong Prisma
  }
}
```

## Các phương thức Tiêu chuẩn

`BaseRepository` cung cấp sẵn các phương thức sau:

- `softDelete(id)`: Đánh dấu bản ghi là đã xóa.
- `restore(id)`: Khôi phục bản ghi đã xóa.

## Tra cứu API

| Phương thức | Tham số | Kiểu trả về | Mô tả |
| :--- | :--- | :--- | :--- |
| `findMany(args?)` | `Prisma.Args` | `Promise<T[]>` | Tìm kiếm nhiều bản ghi. Tự động lọc theo `tenantId` và `deletedAt`. |
| `findUnique(id)` | `string` | `Promise<T \| null>` | Tìm kiếm một bản ghi duy nhất theo ID. |
| `create(data)` | `Partial<T>` | `Promise<T>` | Tạo bản ghi mới. Tự động tiêm `tenantId`. |
| `update(id, data)` | `id`, `Partial<T>` | `Promise<T>` | Cập nhật bản ghi hiện có theo ID. |
| `softDelete(id)` | `string` | `Promise<T>` | Thiết lập `deletedAt` thành timestamp hiện tại. |
| `restore(id)` | `string` | `Promise<T>` | Thiết lập `deletedAt` về lại `null`. |

## Ví dụ: Truy vấn Tùy chỉnh

Nếu bạn cần một truy vấn riêng, bạn có thể truy cập trực tiếp vào Prisma model bên dưới mà vẫn được hưởng lợi từ việc tự động lọc:

```typescript
async findFeatured() {
  return this.model.findMany({
    where: { isFeatured: true }
  });
}
```

> [!NOTE]
> Getter `this.model` trong `BaseRepository` được ủy quyền qua prisma extension của chúng ta, vì vậy bạn không cần thêm `tenantId` thủ công vào các điều kiện `where`.
