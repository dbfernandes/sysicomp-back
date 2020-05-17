import { Router } from 'express';

import usersRouter from './users.routes';
import userTypeRouter from './userType.routes';
import absenceRouter from './absences.routes';
import roomRouter from './room.routes';
import sessionsRouter from './sessions.routes';
import postStudentRouter from './postStudent.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/userType', userTypeRouter);
routes.use('/absences', absenceRouter);
routes.use('/room', roomRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/postStudent', postStudentRouter);

export default routes;
