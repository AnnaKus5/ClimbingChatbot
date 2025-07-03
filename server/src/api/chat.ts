import express, { Request, Response } from 'express';
import { getInfoAgent } from '../assistant/assistant';
import { updateChatHistory } from '../services/chatServices';
import { ChatHistory } from '../agent/agent';
import { think } from '../agent/agent';
import { getThinkPrompt } from '../prompts/think';

const router = express.Router();

export let chatHistory: ChatHistory[] = [];

// context is the data from the database
// where we should store it?
// what format should it have?
export let context: string = '';

router.get('/chat', async (req: Request, res: Response) => {
    try {
        const userMessage = req.body.message;
        updateChatHistory(chatHistory, { role: 'user', content: userMessage });
        const systemPrompt = getThinkPrompt(userMessage, chatHistory, context);
        const response = await think(chatHistory, systemPrompt);
        res.json(response);
    } catch (error) {
        console.error('Error fetching routes:', error);
        res.status(500).json({ error: 'Failed to fetch routes' });
    }
});


export default router;