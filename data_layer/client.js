const { Client } = require("pg");

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost:5432/linkerator";

const client = new Client(DATABASE_URL);
// const client = new Client({
//   connectionString: DATABASE_URL,
//   ssl: process.env.DATABASE_URL ? {rejectUnauthorized: false} : undefined
// });

client.connect();

module.exports = client;