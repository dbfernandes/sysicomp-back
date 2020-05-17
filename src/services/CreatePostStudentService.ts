import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import PostStudent from '../models/PostStudent';

class CreatePostStudentService {
  public async execute(
    bodyContent: Omit<PostStudent, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostStudent> {
    const postStudentsRepository = getRepository(PostStudent);

    const checkUserEmailExists = await postStudentsRepository.findOne({
      where: {
        email: bodyContent.email,
      },
    });

    if (checkUserEmailExists) {
      throw new AppError('E-mail já cadastrado!');
    }

    const checkUserCpfExists = await postStudentsRepository.findOne({
      where: {
        cpf: bodyContent.cpf,
      },
    });

    if (checkUserCpfExists) {
      throw new AppError('CPF já cadastrado!');
    }

    const checkUserRgExists = await postStudentsRepository.findOne({
      where: {
        rg: bodyContent.rg,
      },
    });

    if (checkUserRgExists) {
      throw new AppError('RG já cadastrado!');
    }

    const checkUserRegistrationExists = await postStudentsRepository.findOne({
      where: {
        matricula: bodyContent.matricula,
      },
    });

    if (checkUserRegistrationExists) {
      throw new AppError('Matricula já cadastrada!');
    }

    const postStudent = postStudentsRepository.create(bodyContent);

    await postStudentsRepository.save(postStudent);

    return postStudent;
  }
}

export default CreatePostStudentService;
