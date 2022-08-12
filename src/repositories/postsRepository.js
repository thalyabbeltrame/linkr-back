import connection from '../database/postgres.js';

export const getLikesByPostId = async (postId) => {
  return await connection.query(
    `
      SELECT * FROM likes
      WHERE post_id = $1
    `,
    [postId]
  );
};

export const createLike = async (postId, userId) => {
  return await connection.query(
    `
      INSERT INTO likes (post_id, user_id)
      VALUES ($1, $2)
    `,
    [postId, userId]
  );
};

export const deleteLike = async (likeId) => {
  return await connection.query(
    `
      DELETE FROM likes
      WHERE id = $1
    `,
    [likeId]
  );
};
