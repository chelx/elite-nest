# Thắt chặt Bảo mật 🔒

EliteNest được cấu hình sẵn các biện pháp thắt chặt bảo mật cấp doanh nghiệp để bảo vệ ứng dụng khỏi các lỗ hổng phổ biến và việc vô ý để lộ dữ liệu.

## 1. Ẩn thông tin nhạy cảm trong Log

`AuditService` tích hợp một engine ẩn thông tin đệ quy. Bất kỳ đối tượng nào được ghi lại qua audit trail đều được quét các từ khóa nhạy cảm và tự động che giấu.

```json
// Dữ liệu ban đầu
{
  "email": "admin@company.com",
  "password": "mat-khau-sieu-bao-mat-123"
}

// Kết quả trong nhật ký log
{
  "email": "admin@company.com",
  "password": "********"
}
```

**Các từ khóa được che giấu**: `password`, `token`, `jwt`, `secret`, `apikey`, `key`.

## 2. Xử lý Exception cho Production

Trong môi trường development, thông tin chi tiết về lỗi rất hữu ích. Nhưng ở production, chúng là một rủi ro bảo mật. `AppExceptionFilter` của EliteNest tự động ẩn các chi tiết lỗi nội bộ cho các mã lỗi `500` khi `NODE_ENV=production`.

- **Development**: Trả về full stack trace và các lỗi nội bộ của Prisma.
- **Production**: Trả về một thông báo chung `"Internal server error"` kèm theo một correlation ID để đối chiếu với nhật ký log trên server khi cần debug.

## 3. Ngăn chặn SQL Injection

Bằng cách sử dụng **Prisma** làm ORM chính, EliteNest được hưởng lợi từ việc tự động tham số hóa (parameterization) các câu truy vấn. Chúng tôi cực kỳ khuyến cáo không sử dụng các chuỗi SQL thuần. Nếu bắt buộc phải dùng raw query, các quy tắc linting của chúng tôi sẽ bắt buộc sử dụng `$queryRaw` với template literals để Prisma có thể tham số hóa một cách an toàn.

## 4. Giới hạn tần suất (Rate Limiting)

EliteNest tích hợp sẵn `fastify-rate-limit` (được quản lý qua `FrameworkModule`). Bạn có thể cấu hình giới hạn toàn cục hoặc giới hạn riêng cho từng endpoint trong `ConfigModule`.

```typescript
// config/config.schema.ts
RATE_LIMIT_MAX: z.number().default(100),
RATE_LIMIT_WINDOW: z.string().default('1 minute'),
```
