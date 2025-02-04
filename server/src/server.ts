import express, { Request, Response } from 'express';
import sequelize from './config/database.js';
import sectorRouter from './api/sectors.js'
import { initializeModels } from './models/index.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/sectors', sectorRouter)

const startServer = async () => {
    try {
        await sequelize.sync();
        await initializeModels();
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();