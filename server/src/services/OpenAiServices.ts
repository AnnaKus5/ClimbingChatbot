import { OpenAI } from 'openai';
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { UserPreferences } from '../types';

export default class OpenAiServices {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI();
    }

    async chatCompletion(userMessage: string, chatHistory: string[], systemPrompt: string, jsonMode: boolean = false): Promise<UserPreferences> {
        const messages = [
            { role: 'system', content: systemPrompt },
            // ...chatHistory.map(message => ({ role: message.role, content: message.content })),
            { role: 'user', content: userMessage }
        ] as ChatCompletionMessageParam[];

        const response = await this.openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages,
            response_format: jsonMode ? { type: 'json_object' } : undefined
        });

        return response.choices[0].message.content;
    }
}
