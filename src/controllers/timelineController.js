import * as hashtagsRepository from '../repositories/hashtagsRepository.js';
import * as timelineRepository from '../repositories/timelineRepository.js';
import { getMetadatas } from '../utils/urlMetadata.js';

export const catchPosts = async (_req, res) => {
  try {
    const { rows: posts } = await timelineRepository.getPosts();

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const publishPosts = async (req, res) => {
  const { link, text } = req.body;
  const { userId } = res.locals;

  try {
    const { rows: posts } = await timelineRepository.postPosts(
      link,
      text,
      userId
    );
    const metadatas = await getMetadatas(link);
    await timelineRepository.postMetadatas(metadatas, posts[0].id);

    const { rows: hashtags } = await hashtagsRepository.getHashtags();
    await handleHashtags(hashtags, text, posts[0].id);

    res.status(200).send('Ok');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
