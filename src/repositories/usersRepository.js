import bcrypt from 'bcrypt';

import connection from '../database/postgres.js';

export const getUserByEmail = async (email) => {
  return connection.query(`SELECT * FROM users WHERE email = $1 `, [email]);
};

export const createUser = async (username, email, password, image) => {
  const passwordHash = bcrypt.hashSync(password, 10);
  return connection.query(
    `
      INSERT INTO users (username, email, password, picture_url) 
      VALUES ($1, $2, $3,$4)`,
    [username, email, passwordHash, image]
  );
};
