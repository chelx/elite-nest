# Lưu trữ Đám mây ☁️

EliteNest cung cấp một lớp trừu tượng lưu trữ thống nhất, hỗ trợ cả lưu trữ file cục bộ và các backend tương thích với AWS S3.

## Drivers

Framework sử dụng mô hình driver, cho phép bạn chuyển đổi giữa các nhà cung cấp lưu trữ mà không cần thay đổi logic nghiệp vụ.

- **Local Driver**: Lưu trữ file trong hệ thống tập tin cục bộ của server (tốt nhất cho môi trường phát triển).
- **S3 Driver**: Lưu trữ file trong bất kỳ bucket nào tương thích với S3 (AWS, DigitalOcean Spaces, MinIO).

## Cấu hình

Thiết lập driver lưu trữ của bạn trong file `.env`:

```bash
STORAGE_DRIVER=local # Tùy chọn: local, s3
STORAGE_ROOT=public/uploads
```

## Cách sử dụng

Inject `StorageService` vào class của bạn:

```typescript
constructor(private readonly storage: StorageService) {}
```

// Xóa một file
await this.storage.delete('avatar.png');
```

## Tra cứu API

| Phương thức | Tham số | Kiểu trả về | Mô tả |
| :--- | :--- | :--- | :--- |
| `get(path: string)` | `path` | `Promise<Buffer>` | Lấy nội dung thô của file từ bộ nhớ. |
| `put(path, data)` | `path`, `Buffer \| string` | `Promise<string>` | Lưu file vào thư mục gốc đã cấu hình. Trả về đường dẫn tương đối. |
| `delete(path: string)` | `path` | `Promise<void>` | Xóa file khỏi bộ nhớ. |
| `exists(path: string)` | `path` | `Promise<boolean>` | Kiểm tra xem file có tồn tại trong backend lưu trữ hay không. |

## Cấu hình riêng cho S3

Nếu sử dụng driver S3, bạn phải bổ sung thêm các thông số:
- `S3_BUCKET`
- `S3_REGION`
- `S3_ACCESS_KEY`
- `S3_SECRET_KEY`
- `S3_ENDPOINT` (Dùng cho MinIO hoặc các provider khác)
