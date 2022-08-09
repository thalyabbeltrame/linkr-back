import connection from '../database/postgres.js';

export const getPosts = async () => {
  const { rows: posts } = await connection.query(
    `
      SELECT
        p.id,
        p.url,
        p.description,
        u.username,
        u.picture_url
      FROM posts p
      JOIN users u ON u.id = p.user_id
      ORDER BY p.created_at DESC
      LIMIT 20
    `
  );

  return posts;
};
