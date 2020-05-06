import { Router } from 'express';

import usersRouter from './users.routes';
import userTypeRouter from './userType.routes';
import absenceRouter from './absences.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/userType', userTypeRouter);
routes.use('/absences', absenceRouter);

export default routes;
