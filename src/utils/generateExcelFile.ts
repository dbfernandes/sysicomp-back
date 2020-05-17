import { Response } from 'express';
import Excel from 'exceljs';

import PostStudent from '../models/PostStudent';

export default async function generateExcelFile(
  postStudents: PostStudent[],
  response: Response,
): Promise<void> {
  const workbook = new Excel.Workbook();

  workbook.creator = 'SysIcomp Auto Generated File';
  workbook.created = new Date(2020, 10, 10);

  console.log('Entrei');

  const worksheet = workbook.addWorksheet('My Sheet');

  worksheet.columns = [
    {
      header: 'Matrícula',
      key: 'matricula',
      width: 10,
    },
    {
      header: 'Nome do Aluno',
      key: 'nome',
      width: 35,
    },
    {
      header: 'Curso',
      key: 'curso',
      width: 20,
    },
    {
      header: 'Data de Ingresso',
      key: 'ingresso',
      width: 20,
    },
    {
      header: 'Orientador',
      key: 'orientador',
      width: 20,
    },
    {
      header: 'Linha de pesquisa',
      key: 'pesquisa',
      width: 20,
    },
    {
      header: 'Título da Pesquisa',
      key: 'titulo',
      width: 20,
    },
    {
      header: 'Data da Defesa',
      key: 'defesa',
      width: 20,
    },
  ];

  postStudents.forEach(student => {
    worksheet.addRow({
      matricula: student.matricula,
      nome: student.nome,
      curso: student.curso,
      ingresso: student.dataIngresso,
      orientador: student.orientador.nome,
      pesquisa: student.area.nome,
      titulo: 'Não tem ainda',
      defesa: '20/05/2020',
    });
  });

  await workbook.xlsx.write(response);
}
