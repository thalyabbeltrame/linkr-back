import { decodeToken } from '../utils/jwtToken.js';
import * as usersRepository from '../repositories/usersRepository.js';

export const validateToken = async (req, res, next) => {
  const token = req.header('Authorization')?.split('Bearer ')[1];
  const decoded = decodeToken(token);
  if (!decoded) {
    return res.status(401).send('Unauthorized');
  }
  try {
    const { rows: users } = await usersRepository.getUserById(decoded.id);
    if (!users[0]) {
      return res.status(401).send('Unauthorized');
    }
    res.locals.userId = users[0].id;
    next();
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
