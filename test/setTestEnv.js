const DB_USER = 'app';
const DB_PASSWORD = 'password';

if (!process.env.POSTGRES_URI) {
  // process.env.POSTGRES_URI = 'postgres://postgres:ayoush26@localhost:5432/db';
  process.env.POSTGRES_URI = `postgres://${DB_USER}:${DB_PASSWORD}@localhost:5432/db`;
}
