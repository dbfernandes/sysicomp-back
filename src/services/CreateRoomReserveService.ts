import { getRepository } from 'typeorm';

import RoomReserve from '../models/RoomReserve';

import AppError from '../errors/AppError';

//
// MÓDULO PARADO POR TEMPO INDETERMINADO(AGUARDANDO CONFIRMAÇÃO DO TIPO DE ENVIO DE DADOS DE DATAS PELO FRONT-END)
//

interface Request {
  atividade: string;
  tipo: string;
  dataInicio: Date;
  horaInicio: Date;
  dataTermino: Date;
  horaTermino: Date;
  diasSemana: string;
}

class CreateRoomReserveService {
  public async execute(
    bodyContent: Request,
    usuarioId: string,
    salaId: string,
  ): Promise<RoomReserve> {
    const roomReserveRepository = getRepository(RoomReserve);

    const roomsReserve = await roomReserveRepository.find();

    console.log(bodyContent.dataInicio);

    // const isAvailable = roomsReserve.map(room => {
    //   if()
    // })

    const roomContent = Object.assign(bodyContent, {
      usuarioId: parseInt(usuarioId, 10),
      salaId: parseInt(salaId, 10),
    });

    const roomReserve = roomReserveRepository.create(roomContent);

    await roomReserveRepository.save(roomReserve);

    return roomReserve;
  }
}

export default CreateRoomReserveService;
