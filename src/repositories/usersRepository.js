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

export const getUsersListByName = async (id, name) => {
  return await connection.query(
    `
    SELECT u.id, u.username,
    ( select count(*) 
    from follows f
    where f.followed_id = u.id
    and f.follower_id = $1) as follow, u.avatar
    FROM users u
    WHERE u.username 
    ILIKE $2
    ORDER BY follow DESC
    , u.username ASC;
    `, [id, `${name}%`]
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
