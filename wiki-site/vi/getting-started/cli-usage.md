# Công cụ CLI 🛠️

EliteNest đi kèm với một giao diện dòng lệnh mạnh mẽ được thiết kế để tự động hóa việc tạo mã nguồn (boilerplate).

## Tổng quan

CLI được tích hợp sâu vào Nx monorepo. Nó tận dụng các template **Handlebars** để tạo ra mã nguồn nhất quán, type-safe và tuân thủ các tiêu chuẩn của framework.

## Cách sử dụng cơ bản

Bạn có thể gọi CLI bằng lệnh `npx nx run core:cli`:

```bash
npx nx run core:cli -- [lệnh] [tùy chọn]
```

## Các lệnh có sẵn

### 1. `make:crud`
Tạo một module NestJS hoàn chỉnh bao gồm Controller, Service, Repository và các DTO.

```bash
npx nx run core:cli -- make:crud --name Product --crud
```

- `--name`: Tên của entity (PascalCase).
- `--crud`: Cờ để tạo các thao tác CRUD cơ bản (create, findMany, findOne, update, remove).

### 2. `make:module`
Tạo một module NestJS tiêu chuẩn mà không có logic CRUD.

```bash
npx nx run core:cli -- make:module --name Analytics
```

## Logic của Template

Toàn bộ mã nguồn được tạo ra dựa trên các template nằm trong `libs/core/src/cli/templates/`. Các template này đảm bảo:
- **An toàn về kiểu dữ liệu (Type-Safety)**: Các Repository tự động kế thừa `BaseRepository<T>`.
- **Sự nhất quán**: Route và tên file tuân theo quy ước `kebab-case`.
- **Khởi tạo sẵn**: Các module được cấu hình sẵn với các provider injection cần thiết.

## Xử lý sự cố

Nếu CLI không ghi được file, hãy đảm bảo terminal của bạn có quyền ghi vào thư mục `apps/api/src/app/modules`.
