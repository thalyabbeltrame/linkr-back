import { getUsersListByName as getUser, getPostsByUser } from "../repositories/usersRepository.js"
import { getMetadatas } from '../utils/urlMetadata.js';

export async function getUsersListByName(req, res) {
    const { name } = req.params;
    if (!name) {
        return res.status(403).send("Param can be not empaty");
    }
    try {
        const { rows: list } = await getUser(name);
        res.send(list);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getUserPostsById(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(403).send("Param can be not empaty");
    }
    console.log(id)
    try {
        const { rows: posts_list } = await getPostsByUser(id);
        res.status(200).send(posts_list)
    } catch (error) {
        res.sendStatus(500)
    }

}