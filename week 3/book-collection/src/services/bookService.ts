import fs from 'fs';
import { Book } from '../types/types';

const dataFilePath = './src/data/books.json';


export const readBooks = (): Book[] => {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
};


export const writeBooks = (books: Book[]) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(books, null, 2), 'utf-8');
};
