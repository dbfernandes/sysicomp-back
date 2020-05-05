import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import UserRepository from '../repositories/usersRepository';

const userTypeRouter = Router();

userTypeRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const userRepository = getCustomRepository(UserRepository);
  try {
    const users = await userRepository.findUsersByType(parseInt(id, 10));

    return response.json(users);
  } catch (err) {
    return response.json({ erro: 'Id deve ser enviado como tipo numérico' });
  }
});

export default userTypeRouter;
