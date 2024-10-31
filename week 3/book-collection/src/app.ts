import express from 'express';
import bodyParser from 'body-parser';

import bookRoutes from './routes/bookRoutes';

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', bookRoutes);

app.use((req, res) => {
    res.status(404).send({ message: "404: Endpoint Not Found" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
