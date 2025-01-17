import pool from '../config/database.js';

export async function getRoutes() {
    const [routes] = await pool.query("SELECT * FROM routes LIMIT 10");
    return routes;
}

export async function addRoute(route) {
    const {name, crag, grade, rating} = route;
    const [result] = await pool.query(`
        INSERT INTO routes (name, crag, grade, rating)
        VALUES (?, ?, ?, ?)
    `, [name, crag, grade, rating]);
    return result;
}