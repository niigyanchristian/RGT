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

    const newInvoice: Invoice = {
        id: invoices.length + 1,
        amount,
        status,
        date
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

    invoices.splice(invoiceIndex, 1);
    writeInvoices(invoices);
    res.status(204).send();
};
