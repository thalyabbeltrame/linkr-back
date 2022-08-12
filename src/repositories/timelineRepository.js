import connection from '../database/postgres.js';

export const getPosts = async () => {
  return await connection.query(
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
      ORDER BY p.created_at DESC
      LIMIT 20      
    `
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

export const postMetadatas = async (metadatas, postId) => {
  const { title, image, description } = metadatas;
  await connection.query(
    `
      INSERT INTO metadatas (title, image, description, post_id)
      VALUES ($1, $2, $3, $4)
    `,
    [title, image, description, postId]
  );
};

export const deleteMetaDataByPostId = async (id) => {
  return connection.query(
    `DELETE FROM metadatas 
    WHERE post_id = $1;`,
    [id]
  );
};

export const deleteHashTagsPostsByPostId = async (postId) => {
  return connection.query(
    `DELETE FROM hashtags_posts 
    WHERE post_id = $1;`,
    [postId]
  );
};

export const deletePostById = async (id) => {
  return connection.query(
    `DELETE FROM posts 
    WHERE id = $1;`,
    [id]
  );
};
