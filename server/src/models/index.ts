import Crag from './crag.js';
import Sector from './sector.js';

Crag.hasMany(Sector, { foreignKey: 'crag_id' });
Sector.belongsTo(Crag, { foreignKey: 'crag_id' });

export { Crag, Sector };