import connection from '../database/postgres.js';

export const getUserByEmail = async (email) => {
    return connection.query(`SELECT * FROM users WHERE email = $1 `, [email]);
}