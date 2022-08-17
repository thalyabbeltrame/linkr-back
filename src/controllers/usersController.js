import * as usersRepository from '../repositories/usersRepository.js';

export const getUsersListByName = async (req, res) => {
  const { name, id } = req.params;
  if (!name) {
    return res.status(403).send('Param can be not empaty');
  }
  try {
    const { rows: list } = await usersRepository.getUsersListByName(id, name);
    res.send(list);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
};
