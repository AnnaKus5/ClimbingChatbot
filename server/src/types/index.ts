// types/index.ts
export interface UserPreferences {
    country: string;
    location: string;
    crag?: string;
    sector?: string;
    grade: string[];
    tallPreferences?: number;
    routePreferences: number[];
    collectAllInfo: boolean;
}

interface Route {
    id: number;
    name: string;
    grade_mean: number;
    tall_recommend_sum: number;
    cluster: number;
    rating_tot: number;
    sector_name: string;
    crag_name: string;
}

interface ChatResponse {
    message: string;
    requiredInfo?: string[];
    suggestions?: {
        crags?: string[];
        sectors?: string[];
    };
    routes?: Route[];
}