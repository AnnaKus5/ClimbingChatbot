import express, { Request, Response } from 'express';
import {Sector} from '../models/index.js'

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const sectors = await Sector.findAll();
        res.status(200).json(sectors);
    } catch (error) {
        console.error('Error fetching sectors:', error);
        res.status(500).json({ error: 'Failed to fetch sectors' });
    }
});

export default router;
