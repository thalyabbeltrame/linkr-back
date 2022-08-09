import { getUserByEmail } from '../repositories/usersRepository.js'

export const createUser = async (req, res) => {
    const { name, email, password, image } = req.body;
    try {
        const { rows: user } = await getUserByEmail(email)
        if (user[0]) {
            return res.sendStatus(409);
        }
        console.log("deu certo")
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}
