# The CLI Tool 🛠️

EliteNest comes with a powerful command-line interface designed to automate repetitive boilerplate creation.

## Overview

The CLI is integrated into our Nx monorepo. It leverages **Handlebars** templates to generate consistent, type-safe code that adheres to framework standards.

## Basic Usage

You can invoke the CLI using `npx nx run core:cli`:

```bash
npx nx run core:cli -- [command] [options]
```

## Available Commands

### 1. `make:crud`
Generates a complete NestJS module with a Controller, Service, Repository, and DTOs.

```bash
npx nx run core:cli -- make:crud --name Product --crud
```

- `--name`: The name of the entity (PascalCase).
- `--crud`: Flag to generate basic CRUD operations (create, findMany, findOne, update, remove).

### 2. `make:module`
Generates a standard NestJS module without the CRUD logic.

```bash
npx nx run core:cli -- make:module --name Analytics
```

## Template Logic

All generated code is based on templates found in `libs/core/src/cli/templates/`. These templates ensure:
- **Type-Safety**: Repositories automatically extend `BaseRepository<T>`.
- **Consistency**: Routes and file naming follow the `kebab-case` convention.
- **Bootstrapping**: Modules are pre-configured with the necessary provider injections.

## Troubleshooting

If the CLI fails to write files, ensure your terminal has write permissions in the `apps/api/src/app/modules` directory.
