import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UserRepository from '../repositories/usersRepository';

import CreateLogService from '../services/CreateLogService';

const userTypeRouter = Router();

userTypeRouter.use(ensureAuthenticated);

userTypeRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const createLog = new CreateLogService();

  const userRepository = getCustomRepository(UserRepository);

  const users = await userRepository.findUsersByType(parseInt(id, 10));

  await createLog.execute({
    usuarioId: request.user.id,
    controller: 'userType',
    action: 'Show by id',
    ocorrencia: `Mostrar usuarios pelo id do tipo: ${id}`,
  });

  return response.json(users);
});

export default userTypeRouter;
