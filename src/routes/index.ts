import { Router } from 'express';

import usersRouter from './users.routes';
import userTypeRouter from './userType.routes';
import absenceRouter from './absences.routes';
import roomRouter from './room.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/userType', userTypeRouter);
routes.use('/absences', absenceRouter);
routes.use('/room', roomRouter);

export default routes;
