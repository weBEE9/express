import { Book } from '../db/book.js';

export interface IBookService {
  getBooks: () => Promise<Book[]>;
  getBookByID: (id: number) => Promise<Book | null>;
}
