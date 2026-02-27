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

## Glossary

| Term | Meaning |
| :--- | :--- |
| **Tenant** | A logical silo of data (e.g., a Company or Customer). |
| **Soft-delete** | Marking data as deleted without actually removing it from the DB. |
| **Audit Log** | A record of who changed what, and when. |
| **Monorepo** | One repository containing multiple projects. |
