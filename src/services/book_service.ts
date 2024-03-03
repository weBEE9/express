import { Book } from '../db/book.js';

import { IBookService } from './services.js';
import { IBookRepository } from '../repository/repository.js';

export class BookService implements IBookService {
  repository: IBookRepository;
  constructor(repository: IBookRepository) {
    this.repository = repository;
  }

  async getBooks(): Promise<Book[]> {
    return this.repository.getBooks();
  }

  async getBookByID(id: number): Promise<Book | null> {
    return this.repository.getBookByID(id);
  }
}
