import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const bodyContent = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute(bodyContent);

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ erro: err.message });
  }
});

export default usersRouter;
