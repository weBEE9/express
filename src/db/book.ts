import { book } from './schema.js';

import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type Book = InferSelectModel<typeof book>;
export type BookInsert = InferInsertModel<typeof book>;
