import connection from '../database/postgres.js';

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

export const deleteMetadataByPostId = async (id) => {
  return connection.query(
    `
      DELETE FROM metadatas 
      WHERE post_id = $1
    `,
    [id]
  );
};
