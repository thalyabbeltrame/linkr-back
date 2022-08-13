import connection from '../database/postgres.js';

export const getPosts = async () => {
  return await connection.query(
    `
      SELECT
        p.id,
        p.link,
        p.text,
        u.id AS user_id,
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
      ORDER BY p.created_at DESC
      LIMIT 20      
    `
  );
};

export const getPostsByHashtag = async (hashtag) => {
  return await connection.query(
    `
      SELECT
        p.id,
        p.link,
        p.text,
        u.id AS user_id,
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
      JOIN hashtags_posts hp ON hp.post_id = p.id
      JOIN hashtags h ON h.id = hp.hashtag_id
      WHERE h.name = $1
      ORDER BY p.created_at DESC
      LIMIT 20
    `,
    [hashtag]
  );
};

export const getPostsByUserId = async (id) => {
  return await connection.query(
    `
      SELECT
        p.id,
        p.link,
        p.text,
        u.id AS user_id,
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

export const postPosts = async (link, text, userId) => {
  return await connection.query(
    `
      INSERT INTO posts (link, text, user_id)
      VALUES ($1, $2, $3) RETURNING id
    `,
    [link, text, userId]
  );
};

export const deletePostById = async (id) => {
  return connection.query(
    `
      DELETE FROM posts 
      WHERE id = $1
    `,
    [id]
  );
};
