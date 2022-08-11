import * as hashtagsRepository from '../repositories/hashtagsRepository.js';

export const handleHashtags = async (hashtags, text, postId) => {
  const hashtagsList = text
    .split(' ')
    .filter((word) => word.startsWith('#') && word.length > 1)
    .map((word) => word.slice(1).toLowerCase());

  try {
    hashtagsList?.forEach(async (hashtag) => {
      const hashtagExists = hashtags?.some((h) => h.name === hashtag);
      const { rows } = !hashtagExists
        ? await hashtagsRepository.postHashtags(hashtag)
        : await hashtagsRepository.getHashtagByName(hashtag);
      await hashtagsRepository.postHashtagsRelations(rows[0].id, postId);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
