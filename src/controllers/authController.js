import { getUserByEmail, createUser as newUser } from '../repositories/usersRepository.js'

export const createUser = async (req, res) => {
    const { username, email, password, image } = req.body;
    try {
        const { rows: user } = await getUserByEmail(email)
        if (user[0]) {
            return res.sendStatus(409);
        }
        await newUser(username, email, password, image);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}
