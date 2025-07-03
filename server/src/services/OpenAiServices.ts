import { OpenAI } from 'openai';
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { UserPreferences } from '../types';
import { ChatHistory } from '../agent/agent';


type CompletionResponse = {
    _thinking: string;
    action?: string;
    response?: string;
}

export default class OpenAiServices {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI();
    }

    async completion(systemPrompt: string, chatHistory?: ChatHistory[], jsonMode: boolean = true): Promise<CompletionResponse> {
        const messages = [
            { role: 'system', content: systemPrompt },
            ...chatHistory?.map(message => ({ role: message.role, content: message.content })),
        ] as ChatCompletionMessageParam[];

        const response = await this.openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages,
            response_format: jsonMode ? { type: 'json_object' } : undefined
        });

        return JSON.parse(response.choices[0].message.content || '{}') as CompletionResponse;
    }

 
}
