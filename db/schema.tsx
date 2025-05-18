import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core"

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  profileImage: text("profile_image").default("/placeholder.svg?height=150&width=150"),
  about: text("about").default("New Mirro user"),
  dateOfBirth: text("date_of_birth"),
  gender: text("gender").default("other"),
  tags: text("tags").array(),
  joinedDate: timestamp("joined_date").defaultNow(),
})

// Thoughts table (replacing memories)
export const thoughts = pgTable("thoughts", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .references(() => users.id)
    .notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

// Messages table
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: serial("sender_id")
    .references(() => users.id)
    .notNull(),
  receiverId: serial("receiver_id")
    .references(() => users.id)
    .notNull(),
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  read: boolean("read").default(false),
})

// Connections table (for user relationships)
export const connections = pgTable("connections", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .references(() => users.id)
    .notNull(),
  connectedUserId: serial("connected_user_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

// Export types for TypeScript
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type Thought = typeof thoughts.$inferSelect
export type NewThought = typeof thoughts.$inferInsert

export type Message = typeof messages.$inferSelect
export type NewMessage = typeof messages.$inferInsert

export type Connection = typeof connections.$inferSelect
export type NewConnection = typeof connections.$inferInsert

