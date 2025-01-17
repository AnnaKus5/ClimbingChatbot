import express from 'express';
import { pool, testConnection } from './config/database.js';
import routesRouter from './routes/routes.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/api/routes', routesRouter);

// Start serwera
const startServer = async () => {
    try {
        await testConnection();
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();