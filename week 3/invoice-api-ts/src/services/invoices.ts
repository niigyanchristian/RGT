import fs from 'fs';
import path from 'path';
import { Invoice } from '../types/types';

const invoicesPath = path.join(__dirname, '../invoices.json');

export const readInvoices = (): Invoice[] => {
    try {
        const data = fs.readFileSync(invoicesPath, 'utf8');
        return data.length ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error reading the invoices file:", error);
        return [];
    }
};


export const writeInvoices = (invoices: Invoice[]): void => {
    fs.writeFileSync(invoicesPath, JSON.stringify(invoices, null, 2));
};