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

| **Monorepo** | Một repository duy nhất chứa nhiều project con. |

## Phụ lục: Từ điển thuật ngữ EliteNest 📖

Bản tra cứu đầy đủ hơn 40 thuật ngữ được sử dụng trong framework.

### Framework & Ngôn ngữ
1.  **NestJS**: Framework Node.js có cấu trúc, sử dụng decorator cho Dependency Injection.
2.  **Fastify**: Server HTTP hiệu năng cao, thay thế cho Express.
3.  **TypeScript**: Ngôn ngữ mở rộng của JavaScript bổ sung kiểu dữ liệu (typing).
4.  **Nx**: Hệ thống xây dựng (build system) và quản lý monorepo.
5.  **Prisma**: ORM (Object-Relational Mapper) hiện đại và an toàn về kiểu.
6.  **Fastify-Static**: Plugin để phục vụ các file tĩnh.
7.  **Commander**: Thư viện CLI để tạo các lệnh terminal.
8.  **Handlebars**: Engine template dùng cho việc tạo code mẫu tự động.

### Pattern Kiến trúc
9.  **Transparent Multi-tenancy**: Tự động hóa cô lập tenant qua driver.
10. **Soft-delete**: Sử dụng timestamp thay vì xóa hoàn toàn dòng dữ liệu.
11. **Audit Trailing**: Tự động theo dõi các thay đổi của dữ liệu.
12. **Base Repository**: Lớp trừu tượng generic cho việc truy xuất dữ liệu.
13. **Dependency Injection (DI)**: Cơ chế truyền các phụ thuộc thay vì khởi tạo thủ công.
14. **Inversion of Control (IoC)**: Chuyển giao quyền kiểm soát vòng đời đối tượng cho framework.
15. **AsyncLocalStorage (ALS)**: Cơ chế Node.js để quản lý context trong phạm vi một request.
16. **Monorepo**: Quản lý nhiều ứng dụng/thư viện trong cùng một repository.
17. **Library (Lib)**: Mã nguồn dùng chung, có thể tái sử dụng trong monorepo.
18. **Application (App)**: Một service có thể thực thi và triển khai độc lập.

### Bảo mật & Danh tính
19. **JWT (JSON Web Token)**: Tiêu chuẩn cho xác thực không trạng thái (stateless).
20. **CASL**: Thư viện quản lý các chính sách phân quyền chi tiết.
21. **RBAC**: Kiểm soát truy cập dựa trên Role (vai trò).
22. **ABAC**: Kiểm soát truy cập dựa trên Thuộc tính (attribute).
23. **Redaction**: Việc ẩn đi dữ liệu nhạy cảm (như mật khẩu, token).
24. **PII**: Thông tin định danh cá nhân nhạy cảm.
25. **Strategy (Passport)**: Các module logic xác thực cho các nhà cung cấp khác nhau.
26. **Guard**: Thành phần NestJS quyết định quyền truy cập của request.
27. **Ability**: Tập hợp các quyền cụ thể cho một bối cảnh người dùng.

### Dữ liệu & Hiệu năng
28. **Tenant**: Một phân vùng dữ liệu của một khách hàng cụ thể.
29. **Tenant Isolation**: Đảm bảo kỹ thuật rằng dữ liệu không bị rò rỉ giữa các tenant.
30. **Prisma Extension**: Middleware dành cho Prisma client.
31. **Driver**: Triển khai trừu tượng cho các backend lưu trữ/log khác nhau.
32. **Redis**: Kho chứa dữ liệu trong bộ nhớ (in-memory) dùng cho caching.
33. **TTL (Time to Live)**: Thời gian tồn tại của dữ liệu cache trước khi hết hạn.
34. **Winston**: Thư viện logging có khả năng mở rộng cao.
35. **Daily Rotate**: Tự động dọn dẹp và xoay vòng file log hàng ngày.
36. **Migration**: Các bản cập nhật thay đổi schema cơ sở dữ liệu có phiên bản.

### Trải nghiệm Lập trình viên
37. **Boilerplate**: Các đoạn code lặp đi lặp lại khi khởi tạo.
38. **Scaffolding**: Tự động tạo cấu trúc module và các file mẫu.
39. **D3 (Mermaid)**: Thư viện dùng để vẽ sơ đồ tương tác trong tài liệu.
40. **VitePress**: Công cụ tạo website tĩnh dùng cho bộ tài liệu này.
41. **DTO (Data Transfer Object)**: Schema dùng để kiểm tra dữ liệu đầu vào.
42. **Zod**: Thư viện kiểm tra schema (validation) ưu tiên TypeScript.
