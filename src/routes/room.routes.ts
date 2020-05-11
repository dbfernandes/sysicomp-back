import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateRoomService from '../services/CreateRoomService';
import CreateRoomReserveService from '../services/CreateRoomReserveService';

const roomRouter = Router();

roomRouter.use(ensureAuthenticated);

roomRouter.post('/', async (request, response) => {
  try {
    const bodyContent = request.body;

    const createRoom = new CreateRoomService();

    const room = await createRoom.execute(bodyContent);

    return response.json(room);
  } catch (err) {
    return response.status(400).json({ erro: err.message });
  }
});

roomRouter.post('/:salaId', async (request, response) => {
  try {
    const usuarioId = request.headers.usuarioid;
    const { salaId } = request.params;
    const bodyContent = request.body;

    const createRoomReserve = new CreateRoomReserveService();

    const roomReserve = await createRoomReserve.execute(
      bodyContent,
      typeof usuarioId === 'string' ? usuarioId : 'Erro',
      typeof salaId === 'string' ? salaId : 'Erro',
    );

    return response.json(roomReserve);
  } catch (err) {
    return response.json({ erro: err });
  }
});

export default roomRouter;
