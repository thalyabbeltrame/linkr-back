import pg from "pg";

import "../config/index.js";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

const connection = new Pool({
  connectionString,
//   ssl: {
//     rejectUnauthorized: false,
//   },
});

export default connection;