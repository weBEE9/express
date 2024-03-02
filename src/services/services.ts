import { Book } from '../models/models.js';

export interface IBookService {
  getBooks: () => Promise<Book[]>;
  getBookByID: (id: number) => Promise<Book | null>;
}
