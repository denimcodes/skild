import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

const connectionString =
  process.env.DATABASE_URL ?? process.env.SUPABASE_DATABASE_URL

if (!connectionString) {
  throw new Error(
    'Missing DATABASE_URL (or SUPABASE_DATABASE_URL) environment variable for Drizzle.',
  )
}

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: connectionString,
  },
  verbose: true,
  strict: true,
})
