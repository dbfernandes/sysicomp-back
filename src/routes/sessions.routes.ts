import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { cpf, senha } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      cpf,
      password: senha,
    });

    return response.json({ user, token });
  } catch (err) {
    return response.json({ erro: err });
  }
});

export default sessionsRouter;
