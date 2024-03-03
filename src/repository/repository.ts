import { Book } from '../db/book.js';
import { BookRepositoryDB } from './book_pository_db.js';

import { BookRepositoryStub } from './book_repository_stub.js';

export interface IBookRepository {
  getBooks: () => Promise<Book[]>;
  getBookByID: (id: number) => Promise<Book | null>;
}

// TODO: maybe we should inject drizzle db here instead of using it directly
export class Creator {
  static createBookRepository = (driver: String = 'test'): IBookRepository => {
    switch (driver) {
      case 'test':
        return new BookRepositoryStub();

      case 'postgres':
        return new BookRepositoryDB();

      default:
        throw new Error('Invalid driver');
    }
  };
}
