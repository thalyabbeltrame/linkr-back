import * as postsRepository from '../repositories/postsRepository.js';

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
