import { Router } from 'express';
import { getRepository } from 'typeorm';

import Log from '../models/Log';

interface Logs {
  action: string;
  alunoPosId: number;
  controller: string;
  id: number;
  createdAt: Date;
  usuarioId: number;
  ocorrencia: string | { original: object; novo: object };
}

const logsRouter = Router();

logsRouter.get('/', async (request, response) => {
  const logRepository = getRepository(Log);

  const allLogs = await logRepository.find();

  const newAllLogs: Logs[] = [];

  if (allLogs) {
    allLogs.forEach(log => {
      newAllLogs.push(log);
      if (log.action === 'update') {
        const x = log.ocorrencia.replace('original:', '');

        const original = x.substring(0, x.indexOf('new:') - 1);
        const novo = x.substring(x.indexOf('new:') + 4, x.length);

        newAllLogs[newAllLogs.length - 1].ocorrencia = {
          original: JSON.parse(original),
          novo: JSON.parse(novo),
        };
      }
    });
  }

  return response.json(newAllLogs);
});

export default logsRouter;
