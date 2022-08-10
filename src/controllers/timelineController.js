import * as timelineRepository from '../repositories/timelineRepository.js';
import { getFormattedPosts } from '../utils/urlMetadata.js';

export const catchPosts = async (_req, res) => {
  try {
    const { rows: posts } = await timelineRepository.getPosts();
    const formattedPosts = posts.length ? await getFormattedPosts(posts) : [];

    res.status(200).json(formattedPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const publishPosts = async (req, res) => {
  const { link, text } = req.body;
  const { userId } = res.locals;
  try {
    await timelineRepository.postPosts(link, text,userId);
    res.status(200).json("Ok");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
