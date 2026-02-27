# Overview & Architecture 🏛️

EliteNest is an opinionated framework built on top of NestJS, designed to accelerate the development of complex, multi-tenant SaaS applications.

## High-Level Architecture

EliteNest follows a clean, layered architecture within an Nx monorepo structure.

### 1. Application Layer (`apps/api`)
This is the consumer of the framework. It handles incoming requests, defines routes, and orchestrates services. It should ideally contain minimal business logic, delegating as much as possible to the Core and Shared libraries.

### 2. Core Library (`libs/core`)
The brain of the framework. It contains:
- **Persistence Layer**: BaseRepository, Multi-tenancy & Soft-delete extensions.
- **Security**: JWT strategies, CASL ability factory, policy guards.
- **Infrastructure**: Storage drivers (Local/S3), Cache services (Redis).
- **Audit Engine**: Asynchronous, driver-based logging.

### 3. Shared Library (`libs/shared`)
Contains pure logic, constants, and utilities that have zero dependencies on external frameworks. This can be shared with both backend and frontend projects.

### 4. Contracts Library (`libs/contracts`)
Defines the "handshake" between the API and its consumers. Contains Zod schemas and TypeScript types for all request/response objects.

## Core Philosophies

### Zero-leak Multi-tenancy
We believe multi-tenancy is a security concern, not a database concern. Our architecture ensures that one tenant's data is mathematically impossible to retrieve from another tenant's session context.

### Declarative Security
Permissions should be visible and easy to read. Using CASL allows us to define human-readable policies:
```typescript
can('update', 'Post', { authorId: user.id });
```

### Performance by Default
Every feature in EliteNest—from the Fastify engine to our Async Audit trailing—is designed with a "Latency First" mindset.
