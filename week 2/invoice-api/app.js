const express = require("express");
const bodyParser = require("body-parser");

const invoiceRoute = require("./routes/invoices");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/invoices", invoiceRoute);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
