# EliteNest Framework

EliteNest is a high-performance, multi-tenant oriented NestJS framework designed for rapid SaaS development.

## Core Features

- **Multi-tenancy**: Automatic data isolation using Prisma extensions.
- **Data Layer**: Clean Repository Pattern with Soft Delete and Audit Logging.
- **Security**: JWT-based authentication with tenant-aware strategies and CASL-powered RBAC.
- **Developer Experience**: Dedicated CLI (`elitenest`) for boilerplate generation.
- **Modern Stack**: Fastify, Zod, Prisma, Nx Monorepo.

## Getting Started

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- pnpm

### Installation
```bash
pnpm install
docker-compose up -d
npx prisma migrate dev --name init
pnpm nx serve api
```

### CLI Commands
Rapidly generate modules and CRUD stacks:
```bash
# Generate a full CRUD module
npx tsx libs/core/src/cli/main.ts make:crud product
```

### API Documentation
Once running, access the automated Swagger UI at:
`http://localhost:3000/docs`

## Project Structure
- `apps/api`: Main backend application.
- `libs/core`: Framework core logic (Database, Auth, Storage, Cache).
- `libs/shared`: Common types and utilities.
- `libs/contracts`: Shared API contracts/interfaces.

## Build for Production
```bash
docker build -t elitenest-api .
```

## License
MIT
