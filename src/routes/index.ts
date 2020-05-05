import { Router } from 'express';

import usersRouter from './users.routes';
import userTypeRouter from './userType.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/userType', userTypeRouter);

export default routes;
