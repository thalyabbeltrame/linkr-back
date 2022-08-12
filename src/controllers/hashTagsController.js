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
