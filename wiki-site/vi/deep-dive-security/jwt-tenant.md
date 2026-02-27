# JWT & Chiến lược Tenant 🔑

Việc xác thực trong EliteNest vốn dĩ đã có nhận thức về tenant (tenant-aware). Mỗi token đều ngầm định mang theo thông tin về người dùng là ai VÀ họ thuộc về phân vùng (silo) nào.

## Payload của Token

Một payload JWT trong EliteNest bao gồm:
- `sub`: ID người dùng
- `tenantId`: ID của phiên làm việc tenant hiện tại
- `iat` / `exp`: Thời gian phát hành / Thời gian hết hạn

## JwtStrategy

Trung tâm của hệ thống xác thực là `JwtStrategy`. Khác với các cách triển khai thông thường, nó không chỉ trả về một đối tượng user; nó còn **khóa request đó vào một bối cảnh tenant nhất định**.

```typescript
// libs/core/src/auth/strategies/jwt.strategy.ts

async validate(payload: any) {
    const { sub, tenantId } = payload;
    
    // 1. Kiểm tra người dùng có tồn tại và thuộc về tenant được chỉ định không
    const user = await this.prisma.user.findUnique({
        where: { id: sub, tenantId }
    });

    if (!user) throw new UnauthorizedException();

    // 2. Tiêm context cho phần còn lại của request
    // Các lệnh gọi DB sau đó sẽ tự động lọc theo tenantId này
    runInTenantContext(tenantId, () => {
        // ... xử lý tiếp request
    });

    return user;
}
```

## Lợi ích Bảo mật

1.  **Cô lập trong Token**: Bằng cách mã hóa `tenantId` vào bên trong token, chúng ta ngăn chặn các cuộc tấn công "Proxy" nơi người dùng có thể cố gắng lấy token hợp lệ của một tenant này để truy cập dữ liệu của tenant khác.
2.  **Bối cảnh Stateless**: Server không cần phải tra cứu tenant trong mọi request; thông tin này được tin tưởng thông qua chữ ký của JWT.
3.  **An toàn xuyên Thư viện**: Context `AsyncLocalStorage` lan truyền qua tất cả các dependency, bao gồm cả các plugin của bên thứ ba.
