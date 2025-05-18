import type { Config } from "drizzle-kit"
import * as dotenv from "dotenv"

// Load environment variables
dotenv.config()

// Use a default connection string if DATABASE_URL is not set
const connectionString = process.env.DATABASE_URL || "postgres://placeholder:placeholder@localhost:5432/placeholder"

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString,
  },
  // Optional: Specify tables to include/exclude
  // include: ['users', 'thoughts', 'messages', 'connections'],
  // exclude: ['_migrations'],
} satisfies Config
