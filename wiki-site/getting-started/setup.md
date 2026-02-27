# Local Setup Guide 🛠️

Setting up EliteNest on your local machine is straightforward thanks to our Docker-first approach.

## Prerequisites

Ensure you have the following installed:
- **Node.js**: v20 or v22
- **PNPM**: v9 or v10
- **Docker & Docker Compose**: For Database and Redis
- **Nx CLI**: Optional but recommended (`npm install -g nx`)

## Installation

1.  **Clone and Install Dependencies**:
    ```bash
    git clone https://github.com/your-repo/elitenest.git
    cd elitenest
    pnpm install
    ```

2.  **Environment Configuration**:
    Copy the example env file and fill in your secrets.
    ```bash
    cp .env.example .env
    ```

3.  **Start Infrastructure**:
    ```bash
    docker-compose up -d
    ```
    This starts a **PostgreSQL** instance and a **Redis** instance pre-configured for multi-tenancy.

4.  **Database Migration & Seeding**:
    ```bash
    npx prisma migrate dev
    npx ts-node prisma/seed.ts
    ```

5.  **Run the API**:
    ```bash
    npx nx serve api
    ```

## Multi-project Development

EliteNest is a monorepo. You can run multiple projects or libraries in parallel using Nx:

```bash
# Run API and E2E tests together
npx nx run-many --target=serve --all
```

## Troubleshooting

- **Redis Connection Issues**: Ensure your `REDIS_URL` matches the port mapped in `docker-compose.yml`.
- **Migration Failures**: Check that your `DATABASE_URL` matches the credentials in the docker-compose file.
