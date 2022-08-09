import * as timelineRepository from '../repositories/timelineRepository.js';
import { getFormattedPosts } from '../utils/urlMetadata.js';

export const catchPosts = async (_req, res) => {
  try {
    const { rows: posts } = await timelineRepository.getPosts();
    const formattedPosts = await getFormattedPosts(posts);
    res.status(200).json(formattedPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
