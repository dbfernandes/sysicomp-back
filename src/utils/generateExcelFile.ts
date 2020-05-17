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

  const worksheet = workbook.addWorksheet('My Sheet');

  worksheet.columns = [
    {
      header: 'Matrícula',
      key: 'matricula',
      width: 20,
    },
    {
      header: 'Nome do Aluno',
      key: 'nome',
      width: 40,
    },
    {
      header: 'Curso',
      key: 'curso',
      width: 15,
    },
    {
      header: 'Status do Aluno',
      key: 'status',
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
      width: 40,
    },
    {
      header: 'Linha de pesquisa',
      key: 'pesquisa',
      width: 50,
    },
    {
      header: 'Título da Pesquisa',
      key: 'titulo',
      width: 55,
    },
    {
      header: 'Data da Defesa',
      key: 'defesa',
      width: 15,
    },
  ];

  for (let i = 65; i <= 73; i++) {
    const cell = worksheet.getCell(`${String.fromCharCode(i)}1`);

    cell.style = {
      alignment: {
        horizontal: 'center',
      },
      font: {
        bold: true,
        name: 'Calibri',
        family: 2,
      },
    };
  }

  postStudents.forEach(student => {
    worksheet.addRow({
      matricula: student.matricula,
      nome: student.nome,
      curso: student.curso,
      status: student.statusCorrente,
      ingresso: student.dataIngresso,
      orientador: student.orientador.nome,
      pesquisa: student.area.nome,
      titulo: 'Não tem ainda',
      defesa: '20/05/2020',
    });
  });

  await workbook.xlsx.write(response);
}
