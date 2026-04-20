# Skild

Skild is a full-stack web app for discovering and publishing reusable **AI agent skills**.

It is intentionally built as a portfolio-quality project that demonstrates product thinking, modern frontend architecture, backend data modeling, authentication, and analytics instrumentation.

## Why this project is strong for resumes/interviews

- **Clear product narrative**: “GitHub for AI agent skills” with browse + publish workflows.
- **Modern TypeScript stack**: React 19 + TanStack Start + file-based routing.
- **Full-stack ownership**: UI, route architecture, DB schema/migrations, and seed scripts.
- **Production-minded integrations**: Clerk auth and PostHog event tracking.
- **Demonstrates craft**: reusable components, utility patterns, and structured styling.

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

## Interview Walkthrough Talking Points

If you are presenting this project in an interview, focus on:

1. **Product framing**: why reusable agent skills matter for AI developer workflows.
2. **Routing + architecture**: how TanStack Start keeps route concerns explicit and scalable.
3. **Instrumentation strategy**: which PostHog events were added and how they guide product decisions.
4. **Auth boundary**: how Clerk supports identity and user-scoped actions.
5. **Backend readiness**: Drizzle schema/migration approach and how you would extend it.
6. **Next iteration plan**: search/ranking, user profiles, comments, install metrics, moderation.

## Potential Resume Bullet (copy/adapt)

- Built **Skild**, a full-stack TypeScript platform for publishing and discovering reusable AI agent skills, using React 19 + TanStack Start + Drizzle + Postgres + Clerk + PostHog, with analytics-driven UX instrumentation and database-backed feature foundations.

---

If you want, I can also create a **one-page interview cheat sheet** (system design + tradeoffs + roadmap) from this repo.
