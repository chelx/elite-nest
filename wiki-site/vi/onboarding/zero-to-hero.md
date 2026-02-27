# Lộ trình Học tập Zero-to-Hero 🚀

Bạn mới làm quen với EliteNest? Hãy đi theo lộ trình này để từ bước "Git Clone" đến khi sẵn sàng triển khai "Production" trong thời gian ngắn nhất.

## Phần I: Nền tảng

EliteNest được xây dựng dựa trên các tiêu chuẩn vàng ("Gold Standard") trong phát triển Node.js:
- **NestJS**: Framework nền tảng cho cấu trúc dự án và Dependency Injection.
- **Fastify**: Engine HTTP hiệu năng cao (nhanh hơn Express).
- **Nx**: Công cụ quản lý Monorepo điều phối các ứng dụng và thư viện.
- **Prisma**: ORM type-safe giúp quản lý dữ liệu an toàn.

## Phần II: Điều hướng Codebase

Project của chúng ta được tổ chức theo cấu trúc Monorepo:
- `apps/api`: Nơi chứa logic ứng dụng chính.
- `libs/core`: "Công thức bí mật". Chứa Multi-tenancy, bảo mật và các lớp trừu tượng cơ sở dữ liệu.
- `libs/contracts`: Chia sẻ interface TypeScript giữa backend và (tương lai) frontend.
- `libs/shared`: Các hàm tiện ích thuần túy không phụ thuộc vào framework.

## Phần III: Tạo CRUD đầu tiên

Cách nhanh nhất để thêm tính năng là sử dụng EliteNest CLI:

```bash
# Tạo một module Product đầy đủ với Repository, Service và Controller
npx nx run core:cli -- make:crud --name Product --crud
```

### Các nguyên tắc cần nhớ:
1.  **Không bao giờ thêm `tenantId` thủ công**: `BaseRepository` sẽ tự động xử lý việc này cho bạn.
2.  **Sử dụng DTO**: Luôn kiểm tra dữ liệu đầu vào bằng các DTO dựa trên Zod.
3.  **Kiểm tra Quyền**: Sử dụng decorator `@CheckPolicies()` để thực thi các quy tắc CASL.

## Thuật ngữ cơ bản

| Thuật ngữ | Ý nghĩa |
| :--- | :--- |
| **Tenant** | Một phân vùng dữ liệu riêng biệt (ví dụ: Công ty hoặc Khách hàng). |
| **Soft-delete** | Đánh dấu dữ liệu đã xóa mà không thực sự xóa khỏi cơ sở dữ liệu. |
| **Audit Log** | Nhật ký ghi lại ai đã thay đổi nội dung gì và khi nào. |
| **Monorepo** | Một repository duy nhất chứa nhiều project con. |
