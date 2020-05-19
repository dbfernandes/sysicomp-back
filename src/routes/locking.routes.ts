import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import Locking from '../models/Locking';

import UploadConfig from '../config/upload';

import CreateLockingService from '../services/CreateLockingService';
import UpdateLockingService from '../services/UpdateLockingService';
import DeleteLockingService from '../services/DeleteLockingService';

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

lockingRouter.get('/', async (request, response) => {
  const LockingsRepository = getRepository(Locking);

  const allLockings = await LockingsRepository.find();

  return response.json(allLockings);
});

lockingRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const parsedId = parseInt(id, 10);

  const LockingsRepository = getRepository(Locking);

  const locking = await LockingsRepository.findOne(parsedId);

  return response.json(locking);
});

lockingRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const bodyContent = request.body;

  const parsedId = parseInt(id, 10);

  const updateLockingService = new UpdateLockingService();

  const updatedLocking = await updateLockingService.execute(
    parsedId,
    bodyContent,
  );

  return response.json(updatedLocking);
});

lockingRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const parsedId = parseInt(id, 10);

  const deleteLockingService = new DeleteLockingService();

  const deletedLocking = await deleteLockingService.execute(parsedId);

  return response.json(deletedLocking);
});

export default lockingRouter;
