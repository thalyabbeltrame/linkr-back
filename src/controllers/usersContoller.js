import { getUsersListByName as getUser } from "../repositories/usersRepository.js"


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