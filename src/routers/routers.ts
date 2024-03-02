import express from 'express';

import BookHandler from '../handlers/book_handler.js';

import { IBookService } from '../services/services.js';
import { BookService } from '../services/book_service.js';

import { IBookRepository } from '../repository/repository.js';
import { BookRepositoryStub } from '../repository/book_repository_stub.js';
import { pong } from '../handlers/handlers.js';

const bookRepository: IBookRepository = new BookRepositoryStub();
const bookService: IBookService = new BookService(bookRepository);
const bookHandler = new BookHandler(bookService);

const v1 = express.Router();
{
  v1.get('/books', bookHandler.getBooks);
  v1.get('/books/:id', bookHandler.getBookByID);
}

const router = express.Router();
router.use('/api/v1', v1);
router.get('/ping', pong);

export default router;
