import * as commentsRepository from '../repositories/commentsRepository.js';
import * as hashtagsRepository from '../repositories/hashtagsRepository.js';
import * as likesRepository from '../repositories/likesRepository.js';
import * as metadatasRepository from '../repositories/metadatasRepository.js';
import * as postsRepository from '../repositories/postsRepository.js';
import * as usersRepository from '../repositories/usersRepository.js';
import { handleHashtags } from '../utils/handleHashtags.js';
import { getMetadatas } from '../utils/urlMetadata.js';

export const catchPosts = async (req, res) => {
  const { offset } = req.params;
  try {
    const user_id = res.locals.userId;
    const { rows: posts } = await postsRepository.getPosts(user_id, offset);
    const { rows: response } = await postsRepository.getIsFollowed(user_id);
    if (response.length === 0) {
      return res.status(205).json(posts);
    }
    if (response.length > 0) {
      return res.status(210).json(posts);
    }
    if (posts.length > 0) {
      return res.status(200).json(posts);
    }
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
  const { userId } = res.locals;
  try {
    const { rows: user } = await postsRepository.getPostUser(postId);
    if (user[0]?.user_id !== userId) {
      return res.status(401).send('You can only delete your own posts!');
    }
    await metadatasRepository.deleteMetadataByPostId(postId);
    await hashtagsRepository.deleteHashtagsPostsByPostId(postId);
    await likesRepository.deleteLikesByPostIdAndUserId(postId, userId);
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
  const { hashtag, offset } = req.params;
  try {
    const { rows: posts } = await postsRepository.getPostsByHashtag(
      hashtag,
      offset
    );
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPostsByUserId = async (req, res) => {
  const { id, offset } = req.params;
  if (!id || !offset) {
    return res.status(403).send('Param can be not empty');
  }
  try {
    const { rows: posts_list } = await postsRepository.getPostsByUserId(
      id,
      offset
    );
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
    await hashtagsRepository.deleteHashtagsPostsByPostId(postId);
    const { rows: hashtags } = await hashtagsRepository.getHashtags();
    await handleHashtags(hashtags, text, postId);
    res.status(200).send('Ok');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCommentsByPostId = async (req, res) => {
  const { userId } = res.locals;
  const { id: postId } = req.params;

  try {
    const { rows: comments } = await commentsRepository.getCommentsByPostId(
      userId,
      postId
    );
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const postComment = async (req, res) => {
  const { id: postId } = req.params;
  const { userId } = res.locals;
  const { comment } = req.body;

  try {
    await commentsRepository.postComment(postId, userId, comment);
    res.status(200).send('Ok');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const catchIsFollowed = async (_req, res) => {
  try {
    const user_id = res.locals.userId;
    const { rows: followers } = await postsRepository.getIsFollowed(user_id);
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const catchNewPosts = async (req, res) => {
  const { timestamp } = req.params;
  const { userId } = res.locals;
  try {
    const { rows: posts } = await postsRepository.getNewPosts(
      userId,
      timestamp
    );
    res.status(200).json(posts[0].posts_count + posts[1].posts_count);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
