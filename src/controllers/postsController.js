import * as postsRepository from '../repositories/postsRepository.js';
import * as hashtagsRepository from '../repositories/hashtagsRepository.js';
import { handleHashtags } from '../utils/handleHashtags.js';

export const likeDislikePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = res.locals;

  try {
    const { rows: likes } = await postsRepository.getLikesByPostId(id);
    const like = likes.find((like) => like.user_id === userId);
    if (like) {
      await postsRepository.deleteLike(like.id);
    } else {
      await postsRepository.createLike(id, userId);
    }

    res.status(200).send('Ok');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updatePostDescription = async (req, res) => {
  const { postId } = req.params;
  const { userId } = res.locals;
  const { text } = req.body;

  if (!text) {
    return res.status(422).send('field text in body must be provided');
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
