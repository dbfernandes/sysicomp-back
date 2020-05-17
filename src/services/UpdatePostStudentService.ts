import { getRepository, UpdateResult } from 'typeorm';

import AppError from '../errors/AppError';

import PostStudent from '../models/PostStudent';

class UpdatePostStudentService {
  public async execute(
    id: number,
    bodyContent: Omit<PostStudent, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UpdateResult> {
    const postStudentsRepository = getRepository(PostStudent);

    const checkUserEmailExists = await postStudentsRepository.find({
      where: {
        email: bodyContent.email,
      },
    });

    if (checkUserEmailExists.length > 1) {
      throw new AppError('E-mail já cadastrado!');
    }

    const checkUserCpfExists = await postStudentsRepository.find({
      where: {
        cpf: bodyContent.cpf,
      },
    });

    if (checkUserCpfExists.length > 1) {
      throw new AppError('CPF já cadastrado!');
    }

    const checkUserRgExists = await postStudentsRepository.find({
      where: {
        cpf: bodyContent.cpf,
      },
    });

    if (checkUserRgExists.length > 1) {
      throw new AppError('RG já cadastrado!');
    }

    const checkUserRegistrationExists = await postStudentsRepository.find({
      where: {
        matricula: bodyContent.matricula,
      },
    });

    if (checkUserRegistrationExists.length > 1) {
      throw new AppError('Matricula já cadastrada!');
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
