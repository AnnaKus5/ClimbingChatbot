import DatabaseServices from "../services/DatabaseServices";
import OpenAiServices from "../services/OpenAiServices";

export type ChatHistory = {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

const databaseServices = new DatabaseServices();
const openAiServices = new OpenAiServices();


export const agentTools: Array<{ name: string, description: string, handler: (...args: any[]) => any }> = [
    {
        name: "search-route",
        description: "choose if user wants to find climbing route",
        handler: databaseServices.searchRoutes,
        // parameters: []
    },
    {
        name: "search-crag",
        description: "choose if user wants to find crag for himself",
        handler: databaseServices.searchCrags,
        // parameters: []
    },
    {
        name: "final-answer",
        description: "default action, also use this when you need to contact the user directly (e.g. ask for more information, casual chat or provide results you have in the context below)",
        handler: openAiServices.completion,
        // parameters: []
    }
]

export async function think (userMessages: ChatHistory[], systemPrompt: string) {
    const maxSteps = 8;
    let step = 0;
    let context = '';
    let action: string | null = null;

    while (step < maxSteps) {

        // describe task - what is the intention of the user?
      const decision = await openAiServices.completion(systemPrompt, userMessages)
    }

    // act


    // return the final answer


}

async function act () {


}