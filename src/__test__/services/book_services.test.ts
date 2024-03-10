import { BookService } from '../../services/book_service.js';
import { IBookRepository } from '../../repository/repository.js';
import { Book } from '../../db/book.js';

describe('BookService', () => {
  let bookService: BookService;
  let mockRepository: IBookRepository;

  const mockBooksDB: Book[] = [
    {
      id: 1,
      title: 'Book 1',
      author: 'Author 1',
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'Book 2',
      author: 'Author 2',
      createdAt: new Date(),
    },
  ];

  beforeEach(() => {
    mockRepository = {
      getBooks: jest.fn(async () => {
        return mockBooksDB;
      }),
      getBookByID: jest.fn(async (id: number) => {
        return mockBooksDB.find((book) => book.id === id) || null;
      }),
    };
    bookService = new BookService(mockRepository);
  });

  describe('getBooks', () => {
    it('should call repository.getBooks', async () => {
      const result = await bookService.getBooks();

      expect(mockRepository.getBooks).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockBooksDB);
    });
    it('should return an array of books', async () => {});
  });

  describe('getBookByID', () => {
    it('should call repository.getBookByID with the provided id', async () => {
      const id = 1;
      const result = await bookService.getBookByID(id);

      expect(mockRepository.getBookByID).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockBooksDB[0]);
    });

    it('should return null if no book is found with the provided id', async () => {
      const id = 3;
      const result = await bookService.getBookByID(id);

      expect(mockRepository.getBookByID).toHaveBeenCalledWith(id);
      expect(result).toBeNull();
    });
  });
});
