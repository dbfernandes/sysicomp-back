import { getRepository, UpdateResult } from 'typeorm';

import AppError from '../errors/AppError';

import PostStudent from '../models/PostStudent';

class UpdatePostStudentService {
  public async execute(
    id: number,
    bodyContent: Omit<PostStudent, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UpdateResult> {
    const postStudentsRepository = getRepository(PostStudent);

    const currentPostStudent = await postStudentsRepository.findOne(id, {
      loadEagerRelations: false,
    });

    if (!currentPostStudent) {
      throw new AppError(
        'Não foi possível alterar dados desse usuário\nMotivo: Usuário não consta nos registros',
      );
    }

    if (currentPostStudent?.email !== bodyContent.email) {
      const checkUserEmailExists = await postStudentsRepository.findOne({
        where: {
          email: bodyContent.email,
        },
      });

      if (checkUserEmailExists) {
        throw new AppError('E-mail já cadastrado!');
      }
    }

    if (currentPostStudent?.cpf !== bodyContent.cpf) {
      const checkUserCpfExists = await postStudentsRepository.findOne({
        where: {
          cpf: bodyContent.cpf,
        },
      });

      if (checkUserCpfExists) {
        throw new AppError('CPF já cadastrado!');
      }
    }

    if (currentPostStudent?.rg !== bodyContent.rg) {
      const checkUserRgExists = await postStudentsRepository.findOne({
        where: {
          cpf: bodyContent.cpf,
        },
      });

      if (checkUserRgExists) {
        throw new AppError('RG já cadastrado!');
      }
    }

    if (currentPostStudent?.matricula !== bodyContent.matricula) {
      const checkUserRegistrationExists = await postStudentsRepository.findOne({
        where: {
          matricula: bodyContent.matricula,
        },
      });

      if (checkUserRegistrationExists) {
        throw new AppError('Matricula já cadastrada!');
      }
    }

    const updatedPostUser = await postStudentsRepository.update(
      {
        id,
      },
      bodyContent,
    );

    return updatedPostUser;
  }
}

export default UpdatePostStudentService;
