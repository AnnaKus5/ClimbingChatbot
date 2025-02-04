import express, { Request, Response } from 'express';
import { getInfoAgent } from '../assistant/assistant';
const router = express.Router();

router.get('/chat', async (req: Request, res: Response) => {
    try {
        const userMessage = req.body.message;
        const aiDecision = await getInfoAgent(userMessage);
        res.json(aiDecision);
    } catch (error) {
        console.error('Error fetching routes:', error);
        res.status(500).json({ error: 'Failed to fetch routes' });
    }
});


export default router;