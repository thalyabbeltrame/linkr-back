import bcrypt from 'bcrypt';

import connection from '../database/postgres.js';

export const getUserByEmail = async (email) => {
  return connection.query(`SELECT * FROM users WHERE email = $1 `, [email]);
};

export const createUser = async (username, email, password, image) => {
  const passwordHash = bcrypt.hashSync(password, 10);
  return connection.query(
    `
      INSERT INTO users (username, email, password, avatar) 
      VALUES ($1, $2, $3,$4)`,
    [username, email, passwordHash, image]
  );
};

export const getUsersListByName = async (name) => {
  return connection.query(
    `
    SELECT * FROM users 
    WHERE users.username 
    ILIKE '${name}%'
    `
  )
}
export const getPostsByUser = async (id) => {
  return connection.query(
    `
      SELECT
      p.id,
      p.link,
      p.text,
      u.username,
      u.avatar
    FROM posts p
    JOIN users u ON u.id = p.user_id
    WHERE u.id = $1
    ORDER BY p.created_at DESC
    `,[id]
  )
}

export const getUserById = async (id) => {
  return connection.query(
    `
      SELECT * FROM users WHERE id = $1
    `, [id]
  )
}

