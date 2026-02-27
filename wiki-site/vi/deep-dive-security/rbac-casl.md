# RBAC với CASL 🛡️

EliteNest sử dụng thư viện **CASL** (Complementary Access Control Layer) để định nghĩa và thực thi các quy tắc phân quyền chi tiết.

## Tại sao chọn CASL?

Trong khi RBAC tiêu chuẩn (Roles) phù hợp để xác định "Bạn là ai", CASL vượt trội trong việc xác định "Bạn có thể làm gì với những dữ liệu cụ thể nào" (ABAC/Quyền sở hữu).

## Định nghĩa Khả năng (Abilities)

Các khả năng được định nghĩa trong `CaslAbilityFactory`. Bạn có thể thiết lập quy tắc dựa trên role của người dùng và bối cảnh tenant của họ.

```typescript
// libs/core/src/auth/casl/casl-ability.factory.ts

if (user.roles?.includes('ADMIN')) {
    can('manage', 'all'); // Admin có thể làm mọi thứ
} else {
    can('read', 'all'); // Người dùng thường có thể đọc mọi thứ
    
    // Quy tắc sở hữu: Chỉ tác giả mới có thể cập nhật bài viết của mình
    can('update', 'Post', { authorId: user.id });
}
```

## Thực thi Chính sách

Để bảo vệ một endpoint, hãy sử dụng decorator `@CheckPolicies()` kết hợp với `PoliciesGuard`.

```typescript
@Get(':id')
@CheckPolicies((ability) => ability.can('read', 'Post'))
findOne(@Param('id') id: string) {
    return this.service.findOne(id);
}
```

## Bảo mật mức Đối tượng

EliteNest cũng cung cấp interface `PolicyHandler` cho các trường hợp kiểm tra phức tạp hơn, yêu cầu tải bản ghi thực tế từ database lên trước khi xác nhận quyền hạn.

### Lá chắn Multi-tenant
Framework thực thi một quy tắc "cannot" toàn cục: một người dùng KHÔNG BAO GIỜ có thể quản lý dữ liệu thuộc về một `tenantId` khác, bất kể role của họ là gì.

```typescript
cannot('manage', 'all', { tenantId: { not: user.tenantId } });
```
