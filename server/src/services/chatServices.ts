import { ChatHistory } from "../agent/agent";

export function updateChatHistory (chatHistory: ChatHistory[], newMessage: ChatHistory) {
    chatHistory.push(newMessage);
    return chatHistory; 
}