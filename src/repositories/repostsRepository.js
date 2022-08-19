import connection from '../database/postgres.js';

export const makeRepost = async (postId, userId) => {
    return await connection.query(
        `
    INSERT INTO reposts (post_id, user_id)
    VALUES ($1, $2)
    `,
        [postId, userId]
    );
};

export const getUniqueRepost = async (postId, userId) => {
    return await connection.query(
        `
    SELECT * FROM reposts 
    WHERE post_id =$1
    AND user_id = $2
    `,
        [postId, userId]
    );
};