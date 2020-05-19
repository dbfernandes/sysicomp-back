import { getRepository, DeleteResult } from 'typeorm';

import AppError from '../errors/AppError';

import Locking from '../models/Locking';

class UpdateLockingService {
  public async execute(id: number): Promise<DeleteResult> {
    const LockingsRepository = getRepository(Locking);

    const currentLocking = await LockingsRepository.findOne(id);

    if (!currentLocking) {
      throw new AppError(
        'Impossível alterar dados.\nMotivo: Trancamento não encontrado nos registros',
      );
    }

    const deletedLocking = await LockingsRepository.delete(id);
    return deletedLocking;
  }
}

export default UpdateLockingService;
