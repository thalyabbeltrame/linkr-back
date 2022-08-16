import bcrypt from 'bcrypt';

import connection from '../database/postgres.js';

export const getUserByEmail = async (email) => {
  return await connection.query(`SELECT * FROM users WHERE email = $1 `, [
    email,
  ]);
};

export const createUser = async (username, email, password, image) => {
  const passwordHash = bcrypt.hashSync(password, 10);
  return await connection.query(
    `
      INSERT INTO users (username, email, password, avatar) 
      VALUES ($1, $2, $3,$4)
    `,
    [username, email, passwordHash, image]
  );
};

export const getUsersListByName = async (name) => {
  return await connection.query(
    `
  SELECT u.id, u.username, 
  (SELECT CASE WHEN f.follower_id = 1 THEN 1
      ELSE 0
      END) as follow, u.avatar
  FROM users u
  JOIN follows f
  ON u.id = f.user_id
  WHERE u.username 
  ILIKE '${name}%'
  ORDER BY follow DESC;
    `
  );
};

export const getUserById = async (id) => {
  return connection.query(
    `
      SELECT * FROM users WHERE id = $1
    `,
    [id]
  );
};
