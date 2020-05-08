import { getRepository } from 'typeorm';

import Room from '../models/Room';

import AppError from '../errors/AppError';

interface Request {
  nome: string;
  numero: number;
  localizacao: string;
}

class CreateRoomService {
  public async execute({ nome, numero, localizacao }: Request): Promise<Room> {
    const roomsRepository = getRepository(Room);

    const checkRoomExists = await roomsRepository.findOne({
      where: {
        nome,
        numero,
        localizacao,
      },
    });

    if (checkRoomExists) {
      throw new AppError('Sala já existente');
    }

    const room = roomsRepository.create({ nome, numero, localizacao });

    await roomsRepository.save(room);

    return room;
  }
}

export default CreateRoomService;
