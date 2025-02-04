import Crag from "../models/crag.js";
import Sector from "../models/sector.js";
import Route from "../models/route.js";

type RoutePreferences = {
    grade: string;
    tallPreferences: number;
    routePreferences: number[];
}

export default class DatabaseServices {
    constructor() {
        // this.db = new Database();
        // this.sequelize = new Sequelize();
    }

    async searchCrags(country: string | null = null, cragName: string | null = null) {
        if (cragName === null) {
            const cragsInCountry = await Crag.findAll({
                where: {
                    country: country
                }
            });
            return cragsInCountry;
        }
        else {  
            const crag = await Crag.findAll({
                where: {
                    name: cragName,
                }
            });
            return crag;
        }
    }

    async searchSectors (cragId: number | null = null, sectorName: string | null = null) {
        if (sectorName === null) {
            const sectorsInCrag = await Sector.findAll({
                where: {
                    crag_id: cragId
                }
            });
            return sectorsInCrag;
        }
        else {
            const sector = await Sector.findAll({
                where: {
                    name: sectorName,
                }
            });
            return sector;
        }
    }

    async searchRoutes(sectorId: number, preferences: RoutePreferences) {
        // searchRoutes
        const routes = await Route.findAll({
            where: {
                sector_id: sectorId,
                grade_mean: preferences.grade,
                tall_recommend_sum: preferences.tallPreferences,
                cluster: preferences.routePreferences
            }
        });
        return routes;
    }
}