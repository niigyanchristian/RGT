import { Request, Response } from 'express';
import { Book } from '../types/types';
import { readBooks, writeBooks } from '../services/bookService';


export const createBook = (req: Request, res: Response) => {
  const books = readBooks();
  const { title, author, publicationDate, genre } = req.body;


  if (!title || !author || !publicationDate || !genre) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  const date = new Date(publicationDate);
  if (isNaN(date.getTime())) {
    res.status(400).json({ message: 'Publication date must be a valid date' });
    return;
  }

  const newBook: Book = {
    id: books.length + 1,
    title,
    author,
    publicationDate: date.toISOString(),
    genre,
  };

  books.push(newBook);
  writeBooks(books);
  res.status(201).json(newBook);
};


export const getAllBooks = (req: Request, res: Response) => {
  const books = readBooks();
  res.status(200).json(books);
};


export const getBookById = (req: Request, res: Response) => {
  const books = readBooks();
  const book = books.find((b) => b.id === parseInt(req.params.id, 10));

  if (!book) {
    res.status(404).json({ message: 'Book not found' });
  }

  res.status(200).json(book);
};


export const updateBook = (req: Request, res: Response) => {
  const books = readBooks();
  const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id, 10));

  if (bookIndex === -1) {
    res.status(404).json({ message: 'Book not found' });
  }

  const { title, author, publicationDate, genre } = req.body;

  if (!title || !author || !publicationDate || !genre) {
    res.status(400).json({ message: 'All fields are required' });
  }

  books[bookIndex] = { id: parseInt(req.params.id, 10), title, author, publicationDate, genre };
  writeBooks(books);
  res.status(200).json(books[bookIndex]);
};


export const deleteBook = (req: Request, res: Response) => {
  const books = readBooks();
  const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id, 10));

  if (bookIndex === -1) {
    res.status(404).json({ message: 'Book not found' });
  }

  const book = books.splice(bookIndex, 1);


  writeBooks(books);
  res.status(201).json(book[0]);
};
