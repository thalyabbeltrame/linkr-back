import connection from '../database/postgres.js';

export const getCommentsByPostId = async (userId, postId) => {
  return await connection.query(
    `
      SELECT 
        c.id,
        c.comment,
        u.id AS user_id,
        u.username,
        u.avatar,
        (
          SELECT COUNT(*)::int FROM follows f WHERE f.followed_id = u.id AND f.follower_id = $1
        ) AS is_following
      FROM comments c
      JOIN users u ON u.id = c.writer_id
      WHERE post_id = $2
      ORDER BY c.created_at
    `,
    [userId, postId]
  );
};

export const postComment = async (postId, userId, text) => {
  return await connection.query(
    `
      INSERT INTO comments (post_id, writer_id, comment)
      VALUES ($1, $2, $3)
    `,
    [postId, userId, text]
  );
};
