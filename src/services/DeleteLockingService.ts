import { getRepository, UpdateResult } from 'typeorm';

import AppError from '../errors/AppError';

import Locking from '../models/Locking';

class UpdateLockingService {
  public async execute(id: number): Promise<UpdateResult> {
    const LockingsRepository = getRepository(Locking);

    const currentLocking = await LockingsRepository.findOne(id);

    if (!currentLocking) {
      throw new AppError(
        'Impossível alterar dados.\nMotivo: Trancamento não encontrado nos registros',
      );
    }

    const deletedLocking = await LockingsRepository.update(id, { status: 0 });
    return deletedLocking;
  }
}

export default UpdateLockingService;
