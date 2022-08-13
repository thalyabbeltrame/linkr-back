import * as hashtagsRepository from '../repositories/hashtagsRepository.js';

export const getTagsTrending = async (_req, res) => {
  try {
    const { rows: hashtags } = await hashtagsRepository.getHashTagsTrending();
    const handleHashtags = hashtags.map((hashtags) => {
      return {
        id: hashtags.id,
        name: hashtags.hash_tag,
      };
    });
    res.send(handleHashtags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPostsByHashtag = async (req, res) => {
  const { hashtag } = req.params;
  try {
    const { rows: posts } = await hashtagsRepository.getPostsByHashtag(hashtag);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
