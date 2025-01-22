import mysql from 'mysql2';
import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import Crag from '../models/crag.js'
import Sector from '../models/sector.js';

dotenv.config();

const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [Crag, Sector]
})

export default sequelize;