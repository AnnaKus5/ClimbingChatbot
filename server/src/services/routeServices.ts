import pool from '../config/database.js';

type route = {
    name: string,
    crag: string,
    grade: number,
    rating: number
}


export async function getRoutes() {
    const [routes] = await pool.query("SELECT * FROM routes LIMIT 10");
    return routes;
}

export async function addRoute(route: route) {
    const {name, crag, grade, rating} = route;
    const [result] = await pool.query(`
        INSERT INTO routes (name, crag, grade, rating)
        VALUES (?, ?, ?, ?)
    `, [name, crag, grade, rating]);
    return result;
}