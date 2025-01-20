import express, { Request, Response } from 'express';
import { getRoutes } from '../services/routeServices.js';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const routes = await getRoutes();
        res.json(routes);
    } catch (error) {
        console.error('Error fetching routes:', error);
        res.status(500).json({ error: 'Failed to fetch routes' });
    }
});

// router.get('/search', async (req, res) => {
//     try {
//         const { grade, location, cluster } = req.query;
//         const routes = await searchRoutes({ grade, location, cluster });
//         res.json(routes);
//     } catch (error) {
//         console.error('Error searching routes:', error);
//         res.status(500).json({ error: 'Failed to search routes' });
//     }
// });

export default router;