import { getRepository, getCustomRepository } from 'typeorm';
import pdf from 'html-pdf';
import ejs from 'ejs';
import nodemailer from 'nodemailer';

import Absence from '../models/Absence';
import AppError from '../errors/AppError';
import UsersRepository from '../repositories/usersRepository';

interface Request {
  destino: string;
  tipo: 'nacional' | 'internacional';
  dataSaida: Date | null;
  dataRetorno: Date | null;
  justificativa: string;
  planoReposicao: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jrsscoutinho1@gmail.com',
    pass: 'riuhawpoxxmqexll',
  },
});

class CreateAbsenceService {
  public async execute(
    bodyContent: Request,
    usuarioId: string,
  ): Promise<Absence> {
    const absencesRepository = getRepository(Absence);
    const usersRepository = getCustomRepository(UsersRepository);

    const absenceContent = Object.assign(bodyContent, {
      usuarioId: parseInt(usuarioId, 10),
    });

    const User = await usersRepository.findOne(parseInt(usuarioId, 10));

    const diretores = await usersRepository.findUsersByType(2);
    const coordenadores = await usersRepository.findUsersByType(3);

    const usersToSendEmail = [...diretores, ...coordenadores];

    const destinators = usersToSendEmail.map(user => user.email);

    const absence = absencesRepository.create(absenceContent);

    await absencesRepository.save(absence);

    let projectRoot = process.cwd();
    projectRoot = projectRoot.replace(/\\/g, '/');
    const imgUfam = `file:///${projectRoot}/src/public/UFAM.png`;
    const imgRepublica = `file:///${projectRoot}/src/public/RepublicaFederativa.png`;

    const now = new Date();

    ejs.renderFile(
      './src/utils/htmlToPdf/index.ejs',
      {
        imgUfam,
        imgRepublica,
        nome: User?.nome,
        titulacao: User?.titulacao,
        dataSaida: bodyContent.dataSaida,
        dataRetorno: bodyContent.dataRetorno,
        justificativa: bodyContent.justificativa,
        planoReposicao: bodyContent.planoReposicao,
        tipo: bodyContent.tipo,
        destino: bodyContent.destino,
        email: User?.email,
        data: `${now.getDay()}/${now.getMonth()}/${now.getFullYear()}`,
        hora: `${now.getHours()}:${now.getMinutes()}`,
      },
      (err, html) => {
        if (err) {
          throw new AppError('Erro ao gerar pdf', 500);
        } else {
          pdf
            .create(html, {})
            .toFile(
              `./src/tmp/afastamentos/afastamento-${absence.id}.pdf`,
              (error, _) => {
                if (error) {
                  throw new AppError('Erro ao gerar pdf', 500);
                }
              },
            );
        }
      },
    );

    const mailOptions = {
      from: 'jrsscoutinho1@gmail.com',
      to: destinators,
      subject: ` O(A) ${User?.cargo}(a) ${User?.nome} enviou uma solicitação de afastamento temporário do IComp. `,
      text: `\n Nome: ${User?.nome} \n E-mail: ${User?.email} \n Local: ${absence.destino} \n Tipo de Viagem: ${absence.tipo} \n Data de Saída: ${absence.dataSaida} \n Data de Retorno: ${absence.dataRetorno} \n Justificativa: ${absence.justificativa} \n Data e Hora do envio: ${absence.createdAt}\n\n Para baixar o documento, logue primeiramente no sistema e então clique no link a seguir: http://sys.icomp.ufam.edu.br/index.php?r=afastamentos%2Fprint&id=865
      `,
      attachments: [
        {
          filename: 'afastamento.pdf',
          path: `/home/ricardo/Documentos/UFAM/sysicomp-back/src/tmp/afastamentos/afastamento-${absence.id}.pdf`,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return absence;
  }
}

export default CreateAbsenceService;
