import mysql from 'mysql2';
import { config } from '../config.js';
import { Sequelize } from 'sequelize';

const { host, user, database, password } = config.db;

export const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
  logging: false,
});

const pool = mysql.createPool({
  ...config.db,
});

export const db = pool.promise();
