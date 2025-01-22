import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/routes', async (req: Request, res: Response) => {
    try {

    } catch (error) {
        console.error('Error fetching routes:', error);
        res.status(500).json({ error: 'Failed to fetch routes' });
    }
});


export default router;