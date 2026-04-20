import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import "dotenv/config"

const connectionString =
  process.env.DATABASE_URL ?? process.env.SUPABASE_DATABASE_URL

if (!connectionString) {
  throw new Error(
    'Missing DATABASE_URL (or SUPABASE_DATABASE_URL) environment variable.',
  )
}

type PostgresClient = ReturnType<typeof postgres>

declare global {
  var __dbClient__: PostgresClient | undefined
}

const client =
  globalThis.__dbClient__ ??
  postgres(connectionString, {
    prepare: false,
  })

if (process.env.NODE_ENV !== 'production') {
  globalThis.__dbClient__ = client
}

export const db = drizzle(client, { schema })

export type Database = typeof db

