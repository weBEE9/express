import { db } from '../db/index.js';
import { IBookRepository } from './repository.js';
import { Book } from '../db/book.js';
import { book } from '../db/schema.js';
import { eq } from 'drizzle-orm';

// TODO: maybe we should inject drizzle db here instead of using it directly
export class BookRepositoryDB implements IBookRepository {
  constructor() {}

  async getBookByID(id: number): Promise<Book | null> {
    const result = await db
      .select()
      .from(book)
      .where(eq(book.id, id))
      .execute();

    return result[0];
  }

  async getBooks(): Promise<Book[]> {
    return await db.query.book.findMany();
  }
}
