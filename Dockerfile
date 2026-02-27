# Production Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy root configurations
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY libs/core/package.json ./libs/core/package.json
COPY libs/shared/package.json ./libs/shared/package.json
COPY libs/contracts/package.json ./libs/contracts/package.json
COPY apps/api/package.json ./apps/api/package.json

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate --schema=libs/core/prisma/schema.prisma

# Build the app
RUN npx nx build api --prod

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist/apps/api ./dist/apps/api
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["node", "dist/apps/api/main.js"]
