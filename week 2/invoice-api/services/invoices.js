const fs = require("fs");
const path = require("path");

const invoicesPath = path.join(__dirname, "../invoices.json");

exports.readInvoices = () => {
  const data = fs.readFileSync(invoicesPath);
  return JSON.parse(data);
};

exports.writeInvoices = (invoices) => {
  fs.writeFileSync(invoicesPath, JSON.stringify(invoices, null, 2));
};
