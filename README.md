# NestJS Real-World API Template 🚀

A practical NestJS backend template with authentication, authorization, validation, PostgreSQL, and security-first defaults.

This project is designed as a real-life starter for production-style APIs, not just a tutorial skeleton.

## Highlights ✨

- Feature-based architecture using modules, controllers, and services.
- Global validation with DTOs and class-validator.
- PostgreSQL integration with TypeORM and entity auto-loading.
- JWT authentication with access and refresh tokens.
- Password hashing with bcrypt.
- Role-based access control (RBAC) using guards and role decorators.
- Route-level and auth-level throttling with NestJS Throttler.
- Cookie parsing enabled for browser-based auth workflows.

## Tech Stack 🛠️

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Passport + JWT
- bcrypt
- class-validator / class-transformer
- pnpm

## Current Scope 🎯

Implemented and active ✅:

- Auth module (register, login, refresh, profile, admin creation)
- Posts module (CRUD with ownership + role checks)
- JWT guards and RBAC guards
- Throttling and request validation

Temporarily paused ⏸️:

- Cache and pagination implementation (partial work exists, currently disabled)

## Important Notice ⚠️

**Please read `alert.txt` before working on posts or shared modules.**

**`alert.txt` clearly explains that cache/pagination work is paused and that `src/common` should be ignored for the active implementation.**

**Reference:** `alert.txt`

## Project Structure 🌳

```text
.
├── src
│   ├── auth
│   │   ├── decorators
│   │   ├── dto
│   │   ├── entities
│   │   ├── guard
│   │   ├── strategies
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── posts
│   │   ├── dto
│   │   ├── entities
│   │   ├── interfaces
│   │   ├── pipes
│   │   ├── posts.controller.ts
│   │   ├── posts.service.ts
│   │   └── posts.module.ts
│   ├── oauth
│   ├── oAuthUsers
│   ├── config
│   ├── app.module.ts
│   └── main.ts
└── docs
    └── auth-workflow.md
```

## Getting Started ⚡

### 1) Install dependencies 📦

```bash
pnpm install
```

### 2) Configure environment 🔐

Create a `.env` file in the project root using `trail.example.env` as reference.

Suggested minimum:

```env
APP_NAME=nest-js-mine
DATABASE_URL=postgres://USER:PASSWORD@HOST:5432/DB_NAME

JWT_ACCESS_TOKEN_SECRET=replace-with-strong-random-value
JWT_REFRESH_TOKEN=replace-with-strong-random-value

JWT_SECRET=replace-with-strong-random-value
JWT_EXPIRES_IN=1h

GOOGLE_CLIENT_ID=optional-for-oauth
GOOGLE_SECRET=optional-for-oauth
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

### 3) Run the app ▶️

```bash
# dev (watch mode)
pnpm run dev

# build
pnpm run build

# production
pnpm run start:prod
```

Server starts on:

- `http://localhost:3000`

### 4) Run with Docker Compose 🐳

If you want to run without installing Node.js or pnpm locally, use Docker Compose.

Prerequisites:

- Docker Engine
- Docker Compose plugin

Steps:

```bash
# from project root
docker compose up --build -d nestjs-dev
docker compose logs -f nestjs-dev
```

Stop and clean up:

```bash
docker compose down
```

Notes:

- `docker compose up --build -d nestjs-dev` builds the image, creates the container, and starts it.
- The service reads environment values from `.env` via `env_file` in `docker-compose.yml`.
- Teammates can clone this repository, create `.env` from `trail.example.env`, and run the same Compose commands.

## Available Scripts 🧪

- `pnpm run dev` - Start in watch mode.
- `pnpm run start` - Start once.
- `pnpm run build` - Build TypeScript to `dist`.
- `pnpm run start:prod` - Run compiled app.
- `pnpm run lint` - Lint and autofix.
- `pnpm run format` - Run prettier formatting.
- `pnpm run test` - Unit tests.
- `pnpm run test:e2e` - End-to-end tests.
- `pnpm run test:cov` - Test coverage.

## Validation and DTO Strategy ✅

Global `ValidationPipe` is enabled in `main.ts` with:

- `whitelist: true`
- `forbidNonWhitelisted: true`
- `transform: true`

This enforces strict API payload contracts and automatically transforms incoming data to DTO classes.

## Authentication and Authorization 🔑

### Auth flow 🔄

1. User registers or logs in.
2. Server validates credentials.
3. Server returns JWT access and refresh tokens.
4. Protected routes are guarded by JWT strategy.
5. Role-protected routes require matching role metadata and guards.

See detailed sequence diagram in:

- `docs/auth-workflow.md`

### RBAC 🛡️

Role checks are implemented using:

- `@Roles(...)` decorator
- `RolesGuard`
- `JwtAuthGuard`

Example behavior:

- Post creation/update requires authenticated user.
- Post deletion is restricted to admin.
- Admin creation endpoint is admin-only.

## Security Defaults 🔒

- Password hashing with bcrypt.
- JWT-based route protection.
- Request throttling:
  - Global throttling via `ThrottlerModule`.
  - Additional throttling applied on login endpoint.
- Input validation and payload sanitization via `ValidationPipe`.

## API Overview 📡

### Auth 👤

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `GET /auth/profile` (JWT required)
- `POST /auth/create-admin` (Admin role required)

### Posts 📝

- `GET /posts`
- `GET /posts/:id`
- `POST /posts` (JWT required)
- `PUT /posts/:id` (JWT + ownership/admin logic)
- `DELETE /posts/:id` (Admin role required)

## Database 🗄️

TypeORM is configured in `app.module.ts` with:

- `type: postgres`
- `url: process.env.DATABASE_URL`
- `autoLoadEntities: true`
- `synchronize: true` (development only)

Production note ⚠️:

- Set `synchronize: false` in production and use migrations.

## Development Notes 🧠

- OAuth module files are present but currently not wired in `AppModule` imports.
- Cache and pagination scaffolding exists but is intentionally paused.
- Keep secrets out of source control.

## What Makes This Template Useful 💡

This template gives you a realistic backend baseline with the parts most projects need first:

- clean architecture
- secure auth
- role-based access control
- strict request validation
- database-backed CRUD
- foundational abuse protection

It is a strong base to extend with features like Swagger docs, migrations, refresh token rotation, audit logs, and CI pipelines.

## 👤 Author

[**Prigeesh**](https://github.com/Sai-guru)

Arch Linux | TypeScript | NestJS | PostgreSQL

Always fell free to discuss...
