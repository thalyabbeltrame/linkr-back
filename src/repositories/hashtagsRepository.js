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
  SELECT h.id, h.name as hash_tag, count(hp.hashtag_id) as total 
  FROM hashtags h 
  JOIN hashtags_posts hp 
  ON h.id  = hp.hashtag_id
  GROUP BY h.name, h.id 
  ORDER BY total 
  DESC 
  LIMIT(10)
  `
  return await connection.query(query);
};