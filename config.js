import dotenv from 'dotenv';

dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;

  if (value == null) {
    throw new Error(`Key ${key} is undefiend`);
  }

  return value;
}

export const config = {
  jwt: {
    secretKey: required('JWT_SECRET'),
    expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 86400)),
  },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
  },
  port: parseInt(required('PORT', 8080)),
  db: {
    // MongoDB 용
    connectionString: required('DB_CONNECTION_STRING'),
    // Mysql 용
    host: required('DB_HOST'),
    database: required('DB_DATABASE'),
    user: required('DB_USER'),
    password: required('DB_PASSWORD'),
  },
  cors: {
    allowedOrigin: required('CORS_ALLOW_ORIGIN'),
  },
};
