# Skild

Skild is a full-stack web app for discovering and publishing reusable **AI agent skills**.

## Core Features

- Marketing-style landing page with featured/recent skills
- Skill cards with interaction states and copy-to-clipboard install commands
- Auth-aware navigation (signed-in vs signed-out)
- Analytics events for key product actions (browse, publish, sign-in, copy command)
- Database-ready foundation with Drizzle ORM + migrations + seed support

## Tech Stack

- **Frontend**: React 19, TanStack Start, TanStack Router, Tailwind CSS v4
- **Auth**: Clerk
- **Analytics**: PostHog
- **Data Layer**: Drizzle ORM + Postgres
- **Tooling**: TypeScript, Vite, Vitest, Biome, pnpm

## Architecture Highlights

- Route-first app structure via TanStack file-based routing in `src/routes`
- Reusable UI components in `src/components`
- Data access patterns in `src/db`
- Seed and migration workflows via `scripts/` and `drizzle/`

## Quick Start

### 1) Install dependencies

```bash
pnpm install
```

### 2) Configure environment variables

Create `.env.local` and set:

- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_PUBLIC_POSTHOG_PROJECT_TOKEN`
- `VITE_PUBLIC_POSTHOG_HOST` (optional, defaults to `https://us.posthog.com`)
- Your Postgres connection variables for Drizzle/Supabase

### 3) Run the app

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Database Commands

```bash
pnpm db:generate   # Generate Drizzle SQL from schema
pnpm db:migrate    # Apply migrations
pnpm db:seed       # Seed sample data
pnpm db:studio     # Open Drizzle Studio
```

## Quality Commands

```bash
pnpm test      # Run unit tests
pnpm lint      # Lint with Biome
pnpm check     # Lint + formatting checks
pnpm build     # Production build
```