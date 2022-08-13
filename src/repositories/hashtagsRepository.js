import connection from '../database/postgres.js';

export const getHashtags = async () => {
  return await connection.query(`SELECT * FROM hashtags`);
};

export const postHashtags = async (hashtag) => {
  return await connection.query(
    `INSERT INTO hashtags (name) VALUES ($1) RETURNING *`,
    [hashtag]
  );
};

export const getHashtagByName = async (hashtag) => {
  return await connection.query(`SELECT * FROM hashtags WHERE name = $1`, [
    hashtag,
  ]);
};

export const postHashtagsRelations = async (hashtagId, postId) => {
  return await connection.query(
    `INSERT INTO hashtags_posts (hashtag_id, post_id) VALUES ($1, $2)`,
    [hashtagId, postId]
  );
};

export const getHashTagsTrending = async () => {
  const query = `
    SELECT 
      h.id, 
      h.name as hash_tag, 
      count(hp.hashtag_id) as total 
    FROM hashtags h 
    JOIN hashtags_posts hp ON h.id  = hp.hashtag_id
    GROUP BY h.name, h.id 
    ORDER BY total DESC 
    LIMIT(10)
  `;
  return await connection.query(query);
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
