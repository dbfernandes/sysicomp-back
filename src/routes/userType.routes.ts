import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import UserRepository from '../repositories/usersRepository';

const userTypeRouter = Router();

userTypeRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const userRepository = getCustomRepository(UserRepository);

  const users = await userRepository.findUsersByType(parseInt(id, 10));

  request.log.info(`Usuário Tipo buscado, id:${id}`);

  return response.json(users);
});

export default userTypeRouter;
