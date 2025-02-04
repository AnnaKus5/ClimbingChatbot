import Crag from './crag.js';
import Sector from './sector.js';
import Route from './route.js';

// Make sure models are initialized
export async function initializeModels() {
    // First sync Crag and set up its associations
    await Crag.sync({ alter: false });
    Crag.hasMany(Sector, { 
        foreignKey: 'crag_id',
        as: 'sectors'
    });
    Sector.belongsTo(Crag, { 
        foreignKey: 'crag_id',
        as: 'crag'
    });

    // Then sync Sector and set up its associations
    await Sector.sync({ alter: false });
    Sector.hasMany(Route, { 
        foreignKey: 'sector_id',
        as: 'routes'
    });
    Route.belongsTo(Sector, { 
        foreignKey: 'sector_id',
        as: 'sector'
    });

    // Finally sync Route
    await Route.sync({ alter: false });
}

export { Crag, Sector, Route };