import urlMetadata from 'url-metadata';

export const getFormattedPosts = async (posts) => {
  const formattedPosts = await Promise.all(
    posts.map(async (post) => {
      const metadata = await urlMetadata(post.url);
      return {
        ...post,
        title: metadata.title,
        image: metadata.image,
        description: metadata.description,
      };
    })
  );

  return formattedPosts;
};
