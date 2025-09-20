import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();
const { Client } = pkg;

export function createClient() {
  return new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  });
}
