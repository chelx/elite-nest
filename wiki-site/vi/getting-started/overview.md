# Tổng quan & Kiến trúc 🏛️

EliteNest là một framework NestJS được thiết kế chuyên biệt để tăng tốc phát triển các ứng dụng SaaS phức tạp, hỗ trợ đa khách hàng (multi-tenant).

## Kiến trúc Tổng quát

EliteNest tuân thủ kiến trúc phân lớp sạch (Clean Architecture) trong cấu trúc monorepo của Nx.

### 1. Tầng Ứng dụng (`apps/api`)
Đây là nơi tiêu thụ framework. Nó xử lý các request đầu vào, định nghĩa các route và điều phối các service. Tầng này nên chứa ít logic nghiệp vụ nhất có thể, bàn giao càng nhiều càng tốt cho Core và Shared libraries.

### 2. Thư viện Cốt lõi (`libs/core`)
Bộ não của framework, bao gồm:
- **Tầng Dữ liệu**: BaseRepository, Multi-tenancy & Soft-delete extensions.
- **Bảo mật**: Chiến lược JWT, CASL ability factory, policy guards.
- **Hạ tầng**: Storage drivers (Local/S3), Cache services (Redis).
- **Audit Engine**: Ghi nhật ký không đồng bộ dựa trên driver.

### 3. Thư viện Chia sẻ (`libs/shared`)
Chứa logic thuần túy, các hằng số và tiện ích không phụ thuộc vào các framework bên ngoài. Có thể chia sẻ giữa cả backend và các dự án frontend sau này.

### 4. Thư viện Hợp đồng (`libs/contracts`)
Định nghĩa "cái bắt tay" giữa API và các bên tiêu thụ. Chứa Zod schemas và TypeScript types cho mọi đối tượng request/response.

## Các Triết lý Cốt lõi

### Multi-tenancy Không rò rỉ (Zero-leak)
Chúng tôi tin rằng Multi-tenancy là vấn đề bảo mật, không phải vấn đề database. Kiến trúc của chúng tôi đảm bảo dữ liệu của một tenant này về mặt toán học là không thể truy cập từ phiên làm việc của tenant khác.

### Bảo mật Khai báo (Declarative Security)
Các quyền truy cập nên rõ ràng và dễ đọc. Việc sử dụng CASL cho phép chúng ta định nghĩa các chính sách theo ngôn ngữ con người:
```typescript
can('update', 'Post', { authorId: user.id });
```

### Hiệu năng là mặc định
Mọi tính năng trong EliteNest—từ engine Fastify đến hệ thống Async Audit—đều được thiết kế với tư duy "Ưu tiên Độ trễ thấp" (Latency First).
