import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateAbsenceService from '../services/CreateAbsenceService';

const absenceRouter = Router();

absenceRouter.use(ensureAuthenticated);

absenceRouter.post('/', async (request, reponse) => {
  const bodyContent = request.body;

  const createAbsence = new CreateAbsenceService();

  const usuarioId = request.user.id;

  const absence = await createAbsence.execute(bodyContent, usuarioId);

  return reponse.json(absence);
});

export default absenceRouter;
