import { getRepository, UpdateResult } from 'typeorm';

import AppError from '../errors/AppError';

import Locking from '../models/Locking';

interface Request {
  dataInicio: Date;
  dataTermino: Date;
  justificativa: string;
  observacao: string;
}

class UpdateLockingService {
  public async execute(
    id: number,
    bodyContent: Request,
  ): Promise<UpdateResult> {
    const LockingsRepository = getRepository(Locking);

    const checkLockingExists = await LockingsRepository.findOne(id);

    if (!checkLockingExists) {
      throw new AppError(
        'Impossível Editar Dados.\nMotivo: Trancamento não encontrado nos registros',
      );
    }

    const updatedLocking = LockingsRepository.update(id, bodyContent);

    return updatedLocking;
  }
}

export default UpdateLockingService;
