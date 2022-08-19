import * as repostsRepository from '../repositories/repostsRepository.js';

export const createRepost = async (req, res) => {
  const { userId } = res.locals;
  const { postId } = req.params;
  try {
    const { rows: repost } = await repostsRepository.getUniqueRepost(
      postId,
      userId
    );
    if (repost[0]) {
      return res.status(400).send('You already reposted this post!');
    }
    await repostsRepository.makeRepost(postId, userId);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
