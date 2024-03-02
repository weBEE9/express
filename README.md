# express

Learning express.js, and javascript/typescript.

## Basic web server

```ts
import express from 'express'

const port = 3000;
const app = express();

app.get('/hello', (req, resp)=>{
    resp.send('hello');
});

app.listen(port, () => {
  console.log('Server listening on port 3000 ...');
});
```

## Create router group
```ts
...
const app = express();

const v1 = express.Router();
app.use('/api/v1', v1);
{
    v1.get('/users', ...);
    v1.post('/users', ...);
}
...
```

## Book store

Here we're gonna create a simple book store API server.

### APIs

Curretly we're gonna implemnt only two APIs:

```ts
GET  /books
GET  /books/:id
```

### Model

We'll put the book model in the `models/model.ts`, which represent the basic informantion of a book.

```ts
export type Book = {
  id: number;
  title: string;
  author: string;
};
```

## Repository

We'll declare a book repository interafece and implement is, to manipulate database.

The interface will only have two methods, `getBooks()` and `getBookByID()`.

```ts
export interface IBookRepository {
  getBooks: () => Promise<Book[]>;
  getBookByID: (id: number) => Promise<Book | null>;
}
```

And since we declare a repository interface, we don't need to actually connect to the database, as long as we implement the interface, we can simply use a array of books to represent the database:

```ts
export class BookRepositoryStub implements IBookRepository {
  db: Book[];

  // here we'll use a array of books as our database
  constructor() {
    this.db = [
      {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
      },
      {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
      },
      {
        id: 3,
        title: '1984',
        author: 'George Orwell',
      },
    ];
  }

  async getBookByID(id: number): Promise<Book | null> {
    const book = this.db.find((book) => book.id === id);
    return book ? book : null;
  }

  async getBooks(): Promise<Book[]> {
    return this.db;
  }
}
```

### Service

We'll put our business logic here.

```ts
export interface IBookService {
  getBooks: () => Promise<Book[]>;
  getBookByID: (id: number) => Promise<Book | null>;
}

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
```

### Handler

Handler here will handle the API calls.

```ts
class BookHandler {
  private service: IBookService;

  constructor(service: IBookService) {
    this.service = service;
  }

  getBooks = async (req: Express.Request, resp: Express.Response) => {
    try {
      const books = await this.service.getBooks();
      resp.setHeader('Content-Type', 'application/json');
      resp.status(statusCodes.OK).send(JSON.stringify(books));
    } catch (error) {
      resp.status(statusCodes.INTERNAL_SERVER_ERROR).send(
        JSON.stringify({
          code: statusCodes.INTERNAL_SERVER_ERROR,
          message: `something went wrong`,
        })
      );
    }
  };

  getBookByID = async (req: Express.Request, resp: Express.Response) => {
    const id = parseInt(req.params.id);

    try {
      const book = await this.service.getBookByID(id);
      resp.setHeader('Content-Type', 'application/json');

      if (!book) {
        resp.status(statusCodes.NOT_FOUND).send(
          JSON.stringify({
            code: statusCodes.NOT_FOUND,
            message: `book not found: [id: ${id}]`,
          })
        );
        return;
      }

      resp.status(statusCodes.OK).send(JSON.stringify(book));
    } catch (error) {
      resp.status(statusCodes.INTERNAL_SERVER_ERROR).send(
        JSON.stringify({
          code: statusCodes.INTERNAL_SERVER_ERROR,
          message: `something went wrong`,
        })
      );
    }
  };
}

export default BookHandler;
```

### Router

Finally the router:

```ts
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
```

### Start the server

```ts
const port = 3000;
const app = express();
app.use(router);

app.listen(port, () => {
  console.log('Server listening on port 3000 ...');
});
```
