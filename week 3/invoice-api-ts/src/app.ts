import express from 'express';
import bodyParser from 'body-parser';

const invoiceRoute = require("./routes/invoices");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/invoices", invoiceRoute);

app.use((req, res) => {
    res.status(404).send({ message: "404: Endpoint Not Found" });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
