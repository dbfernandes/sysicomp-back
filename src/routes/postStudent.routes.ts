import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreatePostStudentService from '../services/CreatePostStudentService';
import UpdatePostStudentService from '../services/UpdatePostStudentService';
import PostStudentsRepository from '../repositories/postStudentsRepository';
import generateExcelFile from '../utils/generateExcelFile';

const postStudentRouter = Router();

postStudentRouter.use(ensureAuthenticated);

postStudentRouter.post('/', async (request, response) => {
  const bodyContent = request.body;

  const createPostStudent = new CreatePostStudentService();

  try {
    const postStudent = await createPostStudent.execute(bodyContent);
    return response.json(postStudent);
  } catch (err) {
    return response.status(400).json(err);
  }
});

postStudentRouter.get('/', async (request, response) => {
  const postStudentsRepository = getCustomRepository(PostStudentsRepository);
  const { page = 1, loadEager = 0 } = request.query;

  const totalPostStudents = await postStudentsRepository.getSortedPostStudents(
    Number(loadEager),
  );

  const pagePostStudents = totalPostStudents.slice(
    (Number(page) - 1) * 20,
    (Number(page) - 1) * 20 + 20,
  );

  response.header('X-Total-Count', totalPostStudents.length.toString());

  return response.json(pagePostStudents);
});

postStudentRouter.get('/excel', async (request, response) => {
  const postStudentsRepository = getCustomRepository(PostStudentsRepository);

  const totalPostStudents = await postStudentsRepository.getSortedPostStudents(
    1,
  );

  response.setHeader(
    'Content-disposition',
    'attachment; filename=Planilha-Alunos Pós-graduação.xlsx',
  );
  response.setHeader('Content-type', 'application/vnd.openxmlformats');

  await generateExcelFile(totalPostStudents, response);

  return response.send();
});

postStudentRouter.put('/', async (request, response) => {
  const { id } = request.headers;
  const bodyContent = request.body;

  const updatePostStudentService = new UpdatePostStudentService();

  try {
    const updatedPostStudent = updatePostStudentService.execute(
      typeof id === 'string' ? parseInt(id, 10) : 0,
      bodyContent,
    );

    return response.json(updatedPostStudent);
  } catch (err) {
    return response.status(400).json(err);
  }
});

export default postStudentRouter;
