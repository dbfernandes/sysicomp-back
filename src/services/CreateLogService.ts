import { getRepository } from 'typeorm';

import Log from '../models/Log';

interface Request {
  usuarioId: number;
  alunoPosId?: number;
  controller: string;
  action: string;
  ocorrencia?: string;
}

class CreateLogService {
  public async execute(bodyContent: Request): Promise<void> {
    const logRepository = getRepository(Log);

    const log = logRepository.create(bodyContent);

    await logRepository.save(log);
  }
}

export default CreateLogService;
