import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Default connection string fallback
const connectionString =
  process.env.DATABASE_URL ||
  "postgres://user:password@localhost:5432/mydb";

export default {
  schema: "./src/db/schema.ts",       // path to your Drizzle schema
  out: "./drizzle/migrations",        // where to output migrations
  driver: "pg",                       // use PostgreSQL driver
  dbCredentials: {
    connectionString,
  },
};


