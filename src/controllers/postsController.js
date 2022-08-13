import * as hashtagsRepository from '../repositories/hashtagsRepository.js';
import * as likesRepository from '../repositories/likesRepository.js';
import * as metadatasRepository from '../repositories/metadatasRepository.js';
import * as postsRepository from '../repositories/postsRepository.js';
import * as usersRepository from '../repositories/usersRepository.js';
import { handleHashtags } from '../utils/handleHashtags.js';
import { getMetadatas } from '../utils/urlMetadata.js';

export const catchPosts = async (_req, res) => {
  try {
    const { rows: posts } = await postsRepository.getPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const publishPosts = async (req, res) => {
  const { link, text } = req.body;
  const { userId } = res.locals;

  try {
    const { rows: posts } = await postsRepository.postPosts(link, text, userId);
    const metadatas = await getMetadatas(link);
    await metadatasRepository.postMetadatas(metadatas, posts[0].id);

    const { rows: hashtags } = await hashtagsRepository.getHashtags();
    await handleHashtags(hashtags, text, posts[0].id);

    res.status(200).send('Ok');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePosts = async (req, res) => {
  const { id: postId } = req.params;
  try {
    await metadatasRepository.deleteMetadataByPostId(postId);
    await hashtagsRepository.deleteHashtagsPostsByPostId(postId);
    await postsRepository.deletePostById(postId);
    res.status(200).send('Deleted');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const likeDislikePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = res.locals;

  try {
    const { rows: likes } = await likesRepository.getLikesByPostId(id);
    const like = likes.find((like) => like.user_id === userId);
    if (like) {
      await likesRepository.dislikePost(like.id);
    } else {
      await likesRepository.likePost(id, userId);
    }

    res.status(200).send('Ok');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPostsByHashtag = async (req, res) => {
  const { hashtag } = req.params;
  try {
    const { rows: posts } = await postsRepository.getPostsByHashtag(hashtag);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPostsByUserId = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(403).send('Param can be not empty');
  }
  try {
    const { rows: posts_list } = await postsRepository.getPostsByUserId(id);
    const { rows: user } = await usersRepository.getUserById(id);
    if (!user) {
      return res.sendStatus(404);
    }
    res.status(200).send({ user, posts: posts_list });
  } catch (error) {
    res.sendStatus(500);
  }
};

export const updatePostDescription = async (req, res) => {
  const { postId } = req.params;
  const { userId } = res.locals;
  const { text } = req.body;

  if (!text) {
    return res.status(422).send('Field text in body must be provided');
  }
  try {
    const { rows: user } = await postsRepository.getPostUser(postId);
    if (user[0]?.user_id !== userId) {
      return res.status(401).send('You can only edit your own posts!');
    }
    await postsRepository.updatePostDescription(postId, text);

    const { rows: hashtags } = await hashtagsRepository.getHashtags();
    await handleHashtags(hashtags, text, postId);
    res.status(200).send('Ok');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
