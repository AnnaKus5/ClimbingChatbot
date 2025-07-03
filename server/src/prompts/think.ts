import { agentTools, ChatHistory } from "../agent/agent";
import { chatHistory } from "../api/chat";


export function getThinkPrompt (userMessage: string, chatHistory: ChatHistory[], context: string) {
    return `
You are a helpful assistant in climbing recommendations system. Your role is to choose the best tool to help user to find the best climbing route or crag for him.
You have access to the following tools: 
${agentTools.map(tool => `- ${tool.name}: ${tool.description}`).join('\n')}

Based on the user's message: ${userMessage}
and conversation history: ${chatHistory.map(message => `${message.role}: ${message.content}`).join('\n')}

You have to describe what user wants to achieve. 
If user wants to find a climbing route, use search-route tool. 
If user wants to find a crag, use search-crag tool.
If you don't have enough information to choose the best tool, ask additional questions to get more information. Use final-answer tool.

If you have enough information to answer the question, use final-answer tool.

Data from the database:
${context}

Return response in JSON format:
{
"_thinking": "description of the user's intention and why we should use this tool",
"tool": "search-route | search-crag | final-answer",
"response": "should be empty string"
}
`
}