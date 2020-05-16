import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const postStudentRouter = Router();

postStudentRouter.use(ensureAuthenticated);

postStudentRouter.post('/', async (request, response) => {
  // TODO
});
