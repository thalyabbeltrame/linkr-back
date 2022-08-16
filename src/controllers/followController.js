import * as followRepository from '../repositories/followRepository.js';

export const getFollower = async (req, res) => {
    const { userId } = res.locals;
    const { followedId } = req.params;
    let isFollowing = true;
    try {
        if (userId === followedId) {
            return res.status(200).json({ isFollowing: false })
        }
        const { rows: follow } = await followRepository.getFollow(followedId, userId);
        if (!follow[0]) {
            return res.status(200).json({ isFollowing: false })
        }
        res.status(200).json({ isFollowing: true })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const follow = async (req, res) => {
    const { userId } = res.locals;
    const { followedId } = req.params;
    try {
        if (userId === followedId) {
            return res.status(400).send("You can't follow yourself")
        }
        const { rows: follow } = await followRepository.getFollow(followedId, userId);
        if (follow[0]) {
            return res.status(400).send("You're already following this user!")
        }
        await followRepository.followUser(followedId, userId);
        res.sendStatus(200)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const unfollow = async (req, res) => {
    const { userId } = res.locals;
    const { followedId } = req.params;
    try {
        if (userId === followedId) {
            return res.status(400).send("You can't unfollow yourself")
        }
        const { rows: follow } = await followRepository.getFollow(followedId, userId);
        if (!follow[0]) {
            return res.status(400).send("You're not following this user!")
        }
        await followRepository.unfollowUser(followedId, userId);
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};
