import { Book } from '../db/book.js';

import { BookRepositoryStub } from './book_repository_stub.js';

export interface IBookRepository {
  getBooks: () => Promise<Book[]>;
  getBookByID: (id: number) => Promise<Book | null>;
}

export class Creator {
  static createBookRepository = (driver: String = 'test'): IBookRepository => {
    switch (driver) {
      case 'test':
        return new BookRepositoryStub();

      default:
        throw new Error('Invalid driver');
    }
  };
}
