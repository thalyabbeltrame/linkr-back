import connection from '../database/postgres.js';

export const getFollow = async (followedId, myId) => {
  return await connection.query(
    `
      SELECT * from follows f
      WHERE f.follower_id = $1 
      AND f.followed_id = $2`,
    [myId, followedId]
  );
};

export const followUser = async (followedId, myId) => {
  return await connection.query(
    `
      INSERT INTO follows (follower_id, followed_id)
      VALUES ($1, $2)
    `,
    [myId, followedId]
  );
};

export const unfollowUser = async (followedId, myId) => {
  return await connection.query(
    `
      DELETE FROM follows f
      WHERE f.follower_id = $1 
      AND f.followed_id = $2
    `,
    [myId, followedId]
  );
};
