import { db } from '../db/database.js';

function createSelectQuery(where) {
  return `SELECT 
    T.id, T.text, T.createdAt, T.userId, U.username, U.name, U.url
  FROM tweets as T
    INNER JOIN users as U on U.id = T.userId
  ${where ? `WHERE ${where}` : ''}
  ORDER BY T.createdAt DESC`;
}

export async function getAll() {
  return db.execute(createSelectQuery()).then((result) => result[0]);
}

export async function getAllByUsername(username) {
  return db
    .execute(createSelectQuery('U.username = ?'), [username])
    .then((result) => result[0][0]);
}

export async function getById(id) {
  return db
    .execute(createSelectQuery('T.id = ?'), [id])
    .then((result) => result[0][0]);
}

export async function create(text, userId) {
  return db
    .execute('INSERT INTO tweets (text, createdAt, userId) VALUES (?,?,?)', [
      text,
      new Date(),
      userId,
    ])
    .then((result) => getById(result[0].insertId));
}

export async function update(id, text) {
  return db
    .execute('UPDATE tweets SET text=? WHERE id=?', [text, id])
    .then(() => getById(id));
}

export async function remove(id) {
  db.execute('DELETE FROM tweets WHERE id=?', [id]);
}
