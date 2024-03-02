import { Book, books } from '../models/models.js';

import { IBookRepository } from './repository.js';

export class BookRepositoryStub implements IBookRepository {
  db: Book[];

  constructor() {
    this.db = books;
  }

  // or getBookByID = async (id: number) => {...}
  // getBookByID: (id: number) => Promise<Book | null> = async (id: number) => {...};
  async getBookByID(id: number): Promise<Book | null> {
    const book = this.db.find((book) => book.id === id);
    return book ? book : null;
  }

  // or getBooks = async () => {...}
  // getBooks: () => Promise<Book[]> = async () => {...};
  async getBooks(): Promise<Book[]> {
    return this.db;
  }
}
