import statusCodes from 'http-status-codes';

import { IBookService } from '../services/services.js';
import Express from 'express';

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
