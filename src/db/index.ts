import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// Create a mock database client for development/preview
const createMockDb = () => {
  console.log("Using mock database client")
  return {
    query: async () => [],
    // Add other mock methods as needed
  }
}

// Check for required environment variable
const connectionString = process.env.DATABASE_URL

// Create postgres connection or use mock
let queryClient
let db

try {
  if (!connectionString) {
    console.warn("DATABASE_URL environment variable is not set, using mock database")
    queryClient = createMockDb()
    // Create a mock db object that won't throw errors when methods are called
    db = new Proxy(
      {},
      {
        get: (target, prop) => {
          // Return a function that resolves to an empty array for any method call
          if (prop === "select") {
            return () => ({ from: () => ({ where: () => [] }) })
          }
          if (prop === "insert") {
            return () => ({ values: () => ({ returning: () => [{}] }) })
          }
          if (prop === "delete") {
            return () => ({ where: () => ({ returning: () => [] }) })
          }
          if (prop === "update") {
            return () => ({ set: () => ({ where: () => ({ returning: () => [] }) }) })
          }
          return () => []
        },
      },
    )
  } else {
    queryClient = postgres(connectionString)
    db = drizzle(queryClient, { schema })
  }
} catch (error) {
  console.error("Error setting up database:", error)
  queryClient = createMockDb()
  db = new Proxy(
    {},
    {
      get: (target, prop) => () => [],
    },
  )
}

// Export schema for convenience
export { schema, db }
