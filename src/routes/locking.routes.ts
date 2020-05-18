import { Router } from 'express';
import multer from 'multer';

import UploadConfig from '../config/upload';

import CreateLockingService from '../services/CreateLockingService';

const lockingRouter = Router();

const upload = multer(UploadConfig);

lockingRouter.post('/', async (request, response) => {
  const bodyContent = request.body;
  const responsavelUsuarioId = request.headers.responsavelusuarioid;

  const createLockingService = new CreateLockingService();

  const locking = await createLockingService.execute(
    bodyContent,
    typeof responsavelUsuarioId === 'string'
      ? parseInt(responsavelUsuarioId, 10)
      : 0,
  );

  return response.json(locking);
});

lockingRouter.post(
  '/upload',
  upload.single('Doc'),
  async (request, response) => {
    return response.json({ Message: 'Upload sucessul' });
  },
);

export default lockingRouter;
