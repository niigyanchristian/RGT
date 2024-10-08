const { readInvoices, writeInvoices } = require("../services/invoices");

exports.creatInvoice = (req, res) => {
  const invoices = readInvoices();
  const newInvoice = { id: invoices.length + 1, ...req.body };
  invoices.push(newInvoice);
  writeInvoices(invoices);
  res.status(201).json(newInvoice);
};

exports.getAllInvoices = (req, res) => {
  const invoices = readInvoices();
  res.status(200).json(invoices);
};

exports.getAnInvoice = (req, res) => {
  const invoices = readInvoices();
  const invoice = invoices.find((inv) => inv.id === parseInt(req.params.id));

  if (!invoice) {
    return res.status(404).json({ message: "Invoice not found" });
  }

  res.status(200).json(invoice);
};

exports.updateAnInvoice = (req, res) => {
  const invoices = readInvoices();
  const invoiceIndex = invoices.findIndex(
    (inv) => inv.id === parseInt(req.params.id)
  );

  if (invoiceIndex === -1) {
    return res.status(404).json({ message: "Invoice not found" });
  }

  invoices[invoiceIndex] = { id: parseInt(req.params.id), ...req.body };
  writeInvoices(invoices);
  res.status(201).json(invoices[invoiceIndex]);
};

exports.deleteAnInvoice = (req, res) => {
  const invoices = readInvoices();
  const invoiceIndex = invoices.findIndex(
    (inv) => inv.id === parseInt(req.params.id)
  );

  if (invoiceIndex === -1) {
    return res.status(404).json({ message: "Invoice not found" });
  }

  invoices.splice(invoiceIndex, 1);
  writeInvoices(invoices);
  res.status(204).send();
};
