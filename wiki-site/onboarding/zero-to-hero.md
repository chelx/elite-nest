# Zero-to-Hero Learning Path 🚀

New to EliteNest? Follow this path to go from "Git Clone" to "Production Ready" in record time.

## Part I: Foundations

EliteNest is built on the **Gold Standard** of Node.js development:
- **NestJS**: The underlying framework for structure and dependency injection.
- **Fastify**: The high-performance HTTP engine (faster than Express).
- **Nx**: The monorepo manager that coordinates our apps and libraries.
- **Prisma**: The type-safe ORM that handles our data.

## Part II: Codebase Navigation

Our repository is organized as a Monorepo:
- `apps/api`: The main entry point for our services.
- `libs/core`: The "Secret Sauce". Contains multi-tenancy logic, security, and database abstractions.
- `libs/contracts`: Shared TypeScript interfaces between backend and (future) frontend.
- `libs/shared`: Pure utility functions with zero dependencies.

## Part III: Your First CRUD

The fastest way to add a feature is using the EliteNest CLI:

```bash
# Generate a complete product module with Repository, Service, and Controller
npx nx run core:cli -- make:crud --name Product --crud
```

### Key Concepts to Remember:
1.  **Never manually add `tenantId`**: The `BaseRepository` handles this for you.
2.  **Use DTOs**: Always validate inputs using Zod-backed DTOs.
3.  **Check Permissions**: Decorate your controllers with `@CheckPolicies()` to enforce CASL rules.

| **Monorepo** | Một repository duy nhất chứa nhiều project con. |

## Appendix: The Great EliteNest Glossary 📖

A comprehensive reference for 40+ terms used within the framework.

### Framework & Language
1.  **NestJS**: Structured Node.js framework using decorators for DI.
2.  **Fastify**: High-performance HTTP server, alternative to Express.
3.  **TypeScript**: Typed superset of JavaScript.
4.  **Nx**: Build system and monorepo manager.
5.  **Prisma**: Modern ORM (Object-Relational Mapper).
6.  **Fastify-Static**: Plugin for serving static assets.
7.  **Commander**: CLI library for creating terminal commands.
8.  **Handlebars**: Templating engine used for code generation.

### Architecture Patterns
9.  **Transparent Multi-tenancy**: Automated tenant isolation via drivers.
10. **Soft-delete**: Using timestamps instead of hard row deletions.
11. **Audit Trailing**: Automated tracking of data changes.
12. **Base Repository**: Generic abstraction for data access.
13. **Dependency Injection (DI)**: Passing dependencies instead of manual instantiation.
14. **Inversion of Control (IoC)**: Transferring control of object lifecycle to the framework.
15. **AsyncLocalStorage (ALS)**: Node.js mechanism for request-scoped context.
16. **Monorepo**: Managing multiple apps/libs in one repository.
17. **Library (Lib)**: Shared, reusable code within the monorepo.
18. **Application (App)**: Deployable service within the monorepo.

### Security & Identity
19. **JWT (JSON Web Token)**: Standard for stateless authentication.
20. **CASL**: Library for fine-grained authorization policies.
21. **RBAC**: Role-Based Access Control.
22. **ABAC**: Attribute-Based Access Control.
23. **Redaction**: Masking sensitive data (passwords, tokens).
24. **PII**: Personally Identifiable Information.
25. **Strategy (Passport)**: Modular authentication logic for different providers.
26. **Guard**: NestJS provider that determines request permission.
27. **Ability**: Defined set of permissions for a user context.

### Data & Performance
28. **Tenant**: A customer silo of data.
29. **Tenant Isolation**: Technical guarantee that data doesn't leak.
30. **Prisma Extension**: Middleware for the Prisma client.
31. **Driver**: Abstract implementation for specific storage/logging backends.
32. **Redis**: In-memory data store used for caching.
33. **TTL (Time to Live)**: Duration before cache data expires.
34. **Winston**: Scalable logging library.
35. **Daily Rotate**: Automated file-based log cleanup.
36. **Migration**: Version-controlled updates to DB schema.

### Developer Experience
37. **Boilerplate**: Repetitive setup code.
38. **Scaffolding**: Automated generation of module structures.
39. **D3 (Mermaid)**: Library used for interactive documentation diagrams.
40. **VitePress**: Static site generator used for this documentation.
41. **DTO (Data Transfer Object)**: Schema for validating incoming data.
42. **Zod**: TypeScript-first schema validation library.
