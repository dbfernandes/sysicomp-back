import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreatePostStudentService from '../services/CreatePostStudentService';
import UpdatePostStudentService from '../services/UpdatePostStudentService';
import DeletePostStudentService from '../services/DeletePostStudentService';

import PostStudentsRepository from '../repositories/postStudentsRepository';

import GenerateExcelFile from '../utils/generateExcelFile';

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
  const {
    page = 1,
    loadEager = 0,
    matricula,
    nome,
    curso,
    status,
    ingresso,
    orientador,
    linha_pesquisa,
  } = request.query;

  const totalPostStudents = await postStudentsRepository.getSortedPostStudents(
    Number(loadEager),
    {
      matricula,
      nome,
      curso,
      status,
      ingresso,
      orientador,
      linha_pesquisa,
    },
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
    null,
  );

  response.setHeader(
    'Content-disposition',
    'attachment; filename=Planilha-Alunos Pós-graduação.xlsx',
  );
  response.setHeader('Content-type', 'application/vnd.openxmlformats');

  await GenerateExcelFile(totalPostStudents, response);

  return response.send();
});

postStudentRouter.put('/', async (request, response) => {
  const { id } = request.headers;
  const bodyContent = request.body;

  const updatePostStudentService = new UpdatePostStudentService();

  try {
    const updatedPostStudent = await updatePostStudentService.execute(
      typeof id === 'string' ? parseInt(id, 10) : 0,
      bodyContent,
    );

    return response.json(updatedPostStudent);
  } catch (err) {
    return response.status(400).json(err);
  }
});

postStudentRouter.delete('/', async (request, response) => {
  const { id } = request.headers;

  const deletePostStudentService = new DeletePostStudentService();

  try {
    const deletedPostStudent = await deletePostStudentService.execute(
      typeof id === 'string' ? parseInt(id, 10) : 0,
    );
    return response.json(deletedPostStudent);
  } catch (err) {
    return response.status(400).json(err);
  }
});

export default postStudentRouter;
