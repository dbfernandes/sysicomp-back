import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const bodyContent = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute(bodyContent);

  return response.json(user);
});

export default usersRouter;
