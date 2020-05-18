import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Locking from '../models/Locking';
import PostStudent from '../models/PostStudent';

interface Request {
  alunoPosId: number;
  dataInicio: Date;
  dataTermino: Date;
  justificativa: Date;
}

class CreateLockingService {
  public async execute(
    bodyContent: Request,
    responsavelUsuarioId: number,
  ): Promise<Locking> {
    const lockingRepository = getRepository(Locking);
    const postStudentsRepository = getRepository(PostStudent);

    const checkLockingEmpty = await lockingRepository.find();

    if (checkLockingEmpty.length > 0) {
      const checkPostStudentExists = await postStudentsRepository.findOne({
        where: {
          id: bodyContent.alunoPosId,
        },
      });

      if (!checkPostStudentExists) {
        throw new AppError(
          'Não foi possível registrar o trancamento.\nMotivo: Aluno não encontrado',
        );
      }

      const checkLockingExists = await lockingRepository.findOne({
        where: {
          alunoPosId: bodyContent.alunoPosId,
        },
      });

      if (checkLockingExists) {
        throw new AppError('Esse aluno já possui um trancamento registrado');
      }
    }

    const lockingContent = Object.assign(bodyContent, {
      responsavelUsuarioId,
    });

    const locking = lockingRepository.create(lockingContent);

    await lockingRepository.save(locking);

    return locking;
  }
}

export default CreateLockingService;
