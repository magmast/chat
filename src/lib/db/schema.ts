import type { InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  varchar,
  timestamp,
  json,
  uuid,
  text,
  primaryKey,
  foreignKey,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  email: varchar("email", { length: 64 }).notNull(),
  password: varchar("password", { length: 64 }),
});

export type User = InferSelectModel<typeof users>;

export const settings = pgTable("settings", {
  userId: uuid("user_id")
    .primaryKey()
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  openRouterApiKey: varchar("open_router_api_key", { length: 512 }),
});

export type Settings = InferSelectModel<typeof settings>;

export const chats = pgTable("chats", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("created_at").notNull(),
  title: text("title").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  visibility: varchar("visibility", { enum: ["public", "private"] })
    .notNull()
    .default("private"),
});

export type Chat = InferSelectModel<typeof chats>;

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  chatId: uuid("chat_id")
    .notNull()
    .references(() => chats.id),
  role: varchar("role").notNull(),
  content: json("content").notNull(),
  createdAt: timestamp("created_at").notNull(),
});

export type Message = InferSelectModel<typeof messages>;

export const votes = pgTable(
  "votes",
  {
    chatId: uuid("chat_id")
      .notNull()
      .references(() => chats.id),
    messageId: uuid("message_id")
      .notNull()
      .references(() => messages.id),
    isUpvoted: boolean("is_upvoted").notNull(),
  },
  (t) => [primaryKey({ columns: [t.chatId, t.messageId] })],
);

export type Vote = InferSelectModel<typeof votes>;

export const documents = pgTable(
  "documents",
  {
    id: uuid("id").notNull().defaultRandom(),
    createdAt: timestamp("created_at").notNull(),
    title: text("title").notNull(),
    content: text("content"),
    kind: varchar("text", { enum: ["text", "code", "image"] })
      .notNull()
      .default("text"),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
  },
  (t) => [primaryKey({ columns: [t.id, t.createdAt] })],
);

export type Document = InferSelectModel<typeof documents>;

export const suggestions = pgTable(
  "suggestions",
  {
    id: uuid("id").notNull().defaultRandom(),
    documentId: uuid("document_id").notNull(),
    documentCreatedAt: timestamp("document_created_at").notNull(),
    originalText: text("original_text").notNull(),
    suggestedText: text("suggested_text").notNull(),
    description: text("description"),
    isResolved: boolean("is_resolved").notNull().default(false),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at").notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.id] }),
    foreignKey({
      columns: [t.documentId, t.documentCreatedAt],
      foreignColumns: [documents.id, documents.createdAt],
    }),
  ],
);

export type Suggestion = InferSelectModel<typeof suggestions>;
