import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateAbsenceService from '../services/CreateAbsenceService';

const absenceRouter = Router();

absenceRouter.use(ensureAuthenticated);

absenceRouter.post('/', async (request, reponse) => {
  const bodyContent = request.body;
  const { usuarioid } = request.headers;

  const createAbsence = new CreateAbsenceService();

  const absence = await createAbsence.execute(
    bodyContent,
    typeof usuarioid === 'string' ? usuarioid : 'Erro',
  );

  return reponse.json(absence);
});

export default absenceRouter;
