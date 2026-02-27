# Hướng dẫn Cài đặt Local 🛠️

Việc thiết lập EliteNest trên máy tính cá nhân rất đơn giản nhờ vào cách tiếp cận ưu tiên Docker.

## Điều kiện tiên quyết

Đảm bảo bạn đã cài đặt các công cụ sau:
- **Node.js**: phiên bản v20 hoặc v22
- **PNPM**: phiên bản v9 hoặc v10
- **Docker & Docker Compose**: Để chạy Database và Redis
- **Nx CLI**: Tùy chọn nhưng khuyến khích (`npm install -g nx`)

## Các bước cài đặt

1.  **Clone và Cài đặt Dependencies**:
    ```bash
    git clone https://github.com/your-repo/elitenest.git
    cd elitenest
    pnpm install
    ```

2.  **Cấu hình Môi trường**:
    Sao chép file env mẫu và điền các thông tin bảo mật của bạn.
    ```bash
    cp .env.example .env
    ```

3.  **Khởi động Hạ tầng**:
    ```bash
    docker-compose up -d
    ```
    Lệnh này sẽ khởi động một instance **PostgreSQL** và một instance **Redis** đã được cấu hình sẵn cho multi-tenancy.

4.  **Database Migration & Seeding**:
    ```bash
    npx prisma migrate dev
    npx ts-node prisma/seed.ts
    ```

5.  **Chạy API**:
    ```bash
    npx nx serve api
    ```

## Phát triển Đa dự án

EliteNest là một monorepo. Bạn có thể chạy nhiều dự án hoặc thư viện song song bằng Nx:

```bash
# Chạy đồng thời cả API và E2E tests
npx nx run-many --target=serve --all
```

## Xử lý sự cố

- **Lỗi kết nối Redis**: Kiểm tra xem `REDIS_URL` có khớp với port được ánh xạ trong `docker-compose.yml` không.
- **Lỗi Migration**: Kiểm tra xem `DATABASE_URL` có khớp với thông tin đăng nhập trong file docker-compose không.
