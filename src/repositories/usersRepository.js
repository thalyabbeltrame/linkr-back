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
  );
};
export const getPostsByUser = async (id) => {
  return connection.query(
    `
    SELECT
    p.id,
    p.link,
    p.text,
    u.username,
    u.avatar,
    m.title,
    m.image,
    m.description,
    (
      SELECT 
        CASE
          WHEN COUNT(*) > 0 THEN
          json_agg(json_build_object(
            'userId', u.id,
            'username', u.username
          ))
          ELSE
          '[]'
        END
      FROM likes l
      JOIN users u ON u.id = l.user_id
      WHERE l.post_id = p.id
    ) AS likes
  FROM posts p
  JOIN users u ON u.id = p.user_id
  JOIN metadatas m ON m.post_id = p.id
  WHERE u.id = $1
  ORDER BY p.created_at DESC
    `,
    [id]
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
