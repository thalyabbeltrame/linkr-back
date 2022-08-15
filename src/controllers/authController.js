import bcrypt from 'bcrypt';

import * as usersRepository from '../repositories/usersRepository.js';
import { createToken } from '../utils/jwtToken.js';

export const createUser = async (req, res) => {
  const { username, email, password, image } = req.body;
  try {
    const { rows: user } = await usersRepository.getUserByEmail(email);
    if (user[0]) {
      return res.sendStatus(409);
    }
    await usersRepository.createUser(username, email, password, image);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const allowLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows: user } = await usersRepository.getUserByEmail(email);
    if (!user[0] || !bcrypt.compareSync(password, user[0]?.password)) {
      return res.sendStatus(401);
    }
    const token = createToken({ id: user[0].id, email, password });
    const userData = {
      user: {
        id: user[0].id,
        username: user[0].username,
        image: user[0].avatar,
      },
      token: `Bearer ${token}`,
    };
    res.send(userData);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
