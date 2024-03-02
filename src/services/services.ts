import { Book } from '../models/models.js';

import { IBookRepository } from '../repository/repository.js';
import { BookService } from './book_service.js';

export interface IBookService {
  getBooks: () => Promise<Book[]>;
  getBookByID: (id: number) => Promise<Book | null>;
}

export class Creator {
  static createBookService = (repo: IBookRepository): IBookService => {
    return new BookService(repo);
  };
}
