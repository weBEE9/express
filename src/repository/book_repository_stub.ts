import { Book } from '../models/book.js';

import { IBookRepository } from './repository.js';

export class BookRepositoryStub implements IBookRepository {
  db: Book[];

  constructor() {
    this.db = [
      {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        createdAt: new Date('2021-01-01T00:00:00Z'),
      },
      {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        createdAt: new Date('2021-01-01T00:00:00Z'),
      },
      {
        id: 3,
        title: '1984',
        author: 'George Orwell',
        createdAt: new Date('2021-01-01T00:00:00Z'),
      },
    ];
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
