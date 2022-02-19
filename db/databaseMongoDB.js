import { MongoClient } from 'mongodb';
import { config } from '../config.js';

let db;

export async function connectDB() {
  await MongoClient.connect(config.db.connectionString).then((client) => {
    db = client.db();
  });
}

export function getUsers() {
  return db.collection('users');
}

export function getTweets() {
  return db.collection('tweets');
}
