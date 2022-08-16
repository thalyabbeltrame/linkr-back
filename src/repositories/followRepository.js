import connection from '../database/postgres.js';

export const getFollow = async (followerId, myId) => {
    return await connection.query(`
  SELECT * from follows f
  WHERE f.user_id = $1 
  AND f.follower_id = $2`, [myId, followerId]);
};

export const followUser = async (followerId, myId) => {
    return await connection.query(
        `
        INSERT INTO follows (user_id, follower_id)
        VALUES ($1, $2)
      `,
        [myId, followerId]
    );
};

export const unfollowUser = async (followerId, myId) => {
    return await connection.query(
        `
        DELETE FROM follows f
        WHERE f.user_id = $1 
        AND f.follower_id = $2`, [myId, followerId]
    );
};