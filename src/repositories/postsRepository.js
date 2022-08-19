import connection from '../database/postgres.js';

export const getPosts = async (_id, offset) => {
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
        ) AS likes, 
        (
          SELECT COUNT(*)::int FROM comments c WHERE c.post_id = p.id
        ) AS comments_count
      FROM posts p
      JOIN users u ON u.id = p.user_id
      JOIN metadatas m ON m.post_id = p.id
      WHERE u.id in (
        SELECT
        followed_id from follows where follower_id = $1
        )
      ORDER BY p.created_at DESC
      OFFSET $2 LIMIT 10
    `,[_id, (offset-1) * 10]
  );
};

export const getPostsByHashtag = async (hashtag, offset) => {
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
        ) AS likes,
        (
          SELECT COUNT(*)::int FROM comments c WHERE c.post_id = p.id
        ) AS comments_count
      FROM posts p
      JOIN users u ON u.id = p.user_id
      JOIN metadatas m ON m.post_id = p.id
      JOIN hashtags_posts hp ON hp.post_id = p.id
      JOIN hashtags h ON h.id = hp.hashtag_id
      WHERE h.name = $1
      ORDER BY p.created_at DESC
      OFFSET $2 LIMIT 10
    `,
    [hashtag, (offset-1) * 10]
  );
};

export const getPostsByUserId = async (id, offset) => {
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
        ) AS likes,
        (
          SELECT COUNT(*)::int FROM comments c WHERE c.post_id = p.id
        ) AS comments_count
      FROM posts p
      JOIN users u ON u.id = p.user_id
      JOIN metadatas m ON m.post_id = p.id
      WHERE u.id = $1
      ORDER BY p.created_at DESC
      OFFSET $2 LIMIT 10
    `,
    [id, (offset - 1) * 10]
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

export const updatePostDescription = async (postId, text) => {
  return await connection.query(
    `
      UPDATE posts SET text = $1 
      WHERE id = $2
    `,
    [text, postId]
  );
};

export const getPostUser = async (postId) => {
  return await connection.query(
    `
      SELECT p.user_id  
      FROM posts p  
      WHERE p.id = $1
    `,
    [postId]
  );
};

export const getIsFollowed = async (user_id) => {
  return await connection.query(
    `
      SELECT *  
      FROM follows  
      WHERE follows.follower_id = $1
    `,
    [user_id]
  );
};
