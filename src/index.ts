import express from 'express';

import { pong } from './handlers/handlers.js';
import BookHandler from './handlers/book_handler.js';
import {
  IBookService,
  Creator as BookServiceCreator,
} from './services/services.js';
import {
  IBookRepository,
  Creator as BookRepositoryCreator,
} from './repository/repository.js';

const port = 3000;
const app = express();

const bookRepository: IBookRepository =
  BookRepositoryCreator.createBookRepository();
const bookService: IBookService =
  BookServiceCreator.createBookService(bookRepository);

const bookHandler = new BookHandler(bookService);

app.get('/ping', pong);

const bookRouter = express.Router();
app.use('/books', bookRouter);
{
  bookRouter.get('/', bookHandler.getBooks);
  bookRouter.get('/:id', bookHandler.getBookByID);
}

app.listen(port, () => {
  console.log('Server listening on port 3000 ...');
});
