import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const book = pgTable('book', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
