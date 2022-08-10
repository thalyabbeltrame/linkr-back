import urlMetadata from 'url-metadata';

export const getMetadatas = async (link) => {
  const metadatas = await urlMetadata(link);
  return {
    title: metadatas.title,
    image: metadatas.image,
    description: metadatas.description,
  };
};
