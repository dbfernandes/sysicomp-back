import { getRepository, UpdateResult } from 'typeorm';

import AppError from '../errors/AppError';

import PostStudent from '../models/PostStudent';

class DeletePostStudentService {
  public async execute(id: number): Promise<UpdateResult> {
    const postStudentsRepository = getRepository(PostStudent);

    const currentPostStudent = await postStudentsRepository.findOne(id, {
      loadEagerRelations: false,
    });

    if (!currentPostStudent) {
      throw new AppError(
        'Não foi possível deletar esse usuário\nMotivo: Usuário não consta nos registros',
      );
    }

    const deletedPostUser = await postStudentsRepository.update(id, {
      status: 0,
    });

    return deletedPostUser;
  }
}

export default DeletePostStudentService;
