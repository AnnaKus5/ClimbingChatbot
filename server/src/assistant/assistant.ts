import OpenAiServices from "../services/OpenAiServices";
import DatabaseServices from "../services/DatabaseServices";
import { UserPreferences } from "../types";

const openai = new OpenAiServices();
const databaseServices = new DatabaseServices();

interface ConversationContext {
  history: string[];
  currentState: {
    userPreferences?: UserPreferences;
    searchResults?: any;
    lastAction?: string;
  };
}

const systemInstructions = `You are a climbing route advisor assistant. Your goal is to help users find the best climbing routes based on their preferences.
You have to ask user for information until you have all the information you need.

Conversation flow:
1. Ask user for country, eg. "W jakim kraju chcesz wspinać?"
2. Ask user for crag, eg. "Wybierz rejon z listy"
3. Ask user for sector, eg. "W jakim sektorze chcesz wspinac? Poniżej dostępne sektory"
4. Ask user for grade, eg. "Jakiej trudnosci chcesz wspinać? Podaj wycenę w skali francuskiej."
5. Ask user for type of route, eg. "Jakich dróg szukasz? Polecić Ci drogi szczególnie rekomendowane, drogi łatwej na onsajt, drogi szczególne często robione przez kobiety, a może bardzo popularne drogi?"
6. Ask user for tall preferences, eg. "Czy szukasz dróg które mogą być łatwe dla niskich lub wysokich osób?"

You can perform these actions:
- SEARCH_CRAGS(country) - if user choose the country, you have to search for crags in this country
- SEARCH_SECTORS(cragId, location?) - if user choose the crag, you have to search for sectors in this crag
- SEARCH_ROUTES(sectorId, preferences) - if user choose the sector, you have to search for routes in this sector
- GET_MORE_INFO - if user don't answer the question, you have to ask user for more information to get all the information you need

Analyze the conversation context and decide what action to take next. Respond in JSON format:
{
  "action": "ACTION_NAME",
  "parameters": {},
  "reasoning": "explanation of your decision",
  "needMoreInfo": boolean,
  "userMessage": "message to show user if needed"
}`;

export const getInfoAgent = async (
  userMessage: string, 
  context: ConversationContext = { history: [], currentState: {} }
) => {
    console.log('\n=== New User Message ===');
    console.log('User:', userMessage);
    
    context.history.push(userMessage);

    console.log('\n=== Current Context ===');
    console.log('History length:', context.history.length);
    console.log('Current state:', context.currentState);

    const stateDescription = `
Current conversation state:
${JSON.stringify(context.currentState, null, 2)}

Conversation history:
${context.history.join("\n")}

User message:
${userMessage}
`;

    console.log('\n=== Getting AI Decision ===');
    const decision = await openai.chatCompletion(
        stateDescription,
        [],
        systemInstructions,
        true
    );

    const aiResponse = JSON.parse(decision);
    console.log('AI Decision:', {
        action: aiResponse.action,
        parameters: aiResponse.parameters,
        reasoning: aiResponse.reasoning
    });
    
    console.log('\n=== Executing Action ===');
    const result = await executeAction(aiResponse, context);
    
    context.currentState = {
        ...context.currentState,
        ...result,
        lastAction: aiResponse.action
    };

    console.log('\n=== Updated Context ===');
    console.log('New state:', context.currentState);

    return {
        message: aiResponse.userMessage,
        needMoreInfo: aiResponse.needMoreInfo,
        context
    };
};

const executeAction = async (
    aiDecision: any, 
    context: ConversationContext
) => {
    console.log(`Executing action: ${aiDecision.action}`);
    
    switch (aiDecision.action) {
        case 'SEARCH_CRAGS':
            console.log('Searching crags for:', aiDecision.parameters.country);
            const crags = await databaseServices.searchCrags(
                aiDecision.parameters.country
            );
            console.log('Found crags:', crags?.length || 0);
            return { searchResults: { crags } };

        case 'SEARCH_SECTORS':
            console.log('Searching sectors:', {
                cragId: aiDecision.parameters.cragId,
                location: aiDecision.parameters.location
            });
            const sectors = await databaseServices.searchSectors(
                aiDecision.parameters.cragId,
                aiDecision.parameters.location
            );
            console.log('Found sectors:', sectors?.length || 0);
            return { searchResults: { ...context.currentState.searchResults, sectors } };

        case 'SEARCH_ROUTES':
            console.log('Searching routes:', {
                sectorId: aiDecision.parameters.sectorId,
                preferences: aiDecision.parameters.preferences
            });
            const routes = await databaseServices.searchRoutes(
                aiDecision.parameters.sectorId,
                aiDecision.parameters.preferences
            );
            console.log('Found routes:', routes?.length || 0);
            return { searchResults: { ...context.currentState.searchResults, routes } };

        case 'GET_MORE_INFO':
            console.log('Getting more info:', aiDecision.parameters.question);
            const preferences = await openai.chatCompletion(
                aiDecision.parameters.question,
                context.history,
                "Extract user preferences from their response",
                true
            );
            console.log('Extracted preferences:', preferences);
            return { 
                userPreferences: {
                    ...context.currentState.userPreferences,
                    ...JSON.parse(preferences)
                }
            };

        default:
            console.log('Unknown action:', aiDecision.action);
            return context.currentState;
    }
};
