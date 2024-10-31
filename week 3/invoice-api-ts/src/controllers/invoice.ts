import { Request, Response } from "express";
import { readInvoices, writeInvoices } from "../services/invoices";
import { Invoice } from "../types/types";


export const creatInvoice = (req: Request, res: Response) => {
    const invoices = readInvoices();
    const { amount, status, date } = req.body;


    if (!amount || !status) {
        res.status(400).json({ message: 'Amount and status are required' });
        return;
    }


    if (typeof amount !== 'number' || typeof status !== 'string' || (date && typeof date !== 'string')) {
        res.status(400).json({
            message: 'Invalid data types: amount must be a number, status must be a string, and date must be a string if provided'
        });
        return;
    }

    if (date) {
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) {
            res.status(400).json({ message: 'Date must be a valid date' });
            return;
        }
    }

    const newInvoice: Invoice = {
        id: invoices.length + 1,
        amount,
        status,
        date: date ? new Date(date).toISOString() : new Date().toISOString(),
    };

    invoices.push(newInvoice);
    writeInvoices(invoices);
    res.status(201).json(newInvoice);
};


export const getAllInvoices = (req: Request, res: Response) => {
    const invoices = readInvoices();
    res.json(invoices);
};

export const getAnInvoice = (req: Request, res: Response) => {
    const invoices = readInvoices();
    const invoice = invoices.find((inv) => inv.id === parseInt(req.params.id, 10));

    if (!invoice) {
        res.status(404).json({ message: 'Invoice not found' });
        return;
    }

    res.json(invoice);
};

export const updateAnInvoice = (req: Request, res: Response) => {
    const invoices = readInvoices();
    const invoiceIndex = invoices.findIndex((inv) => inv.id === parseInt(req.params.id, 10));

    if (invoiceIndex === -1) {
        res.status(404).json({ message: 'Invoice not found' });
        return;
    }

    invoices[invoiceIndex] = { id: parseInt(req.params.id, 10), ...req.body };
    writeInvoices(invoices);
    res.json(invoices[invoiceIndex]);
};

export const deleteAnInvoice = (req: Request, res: Response) => {
    const invoices = readInvoices();
    const invoiceIndex = invoices.findIndex((inv) => inv.id === parseInt(req.params.id, 10));

    if (invoiceIndex === -1) {
        res.status(404).json({ message: 'Invoice not found' });
        return;
    }

    const invoice = invoices.splice(invoiceIndex, 1);
    writeInvoices(invoices);
    res.status(204).send(invoice[0]);
};
