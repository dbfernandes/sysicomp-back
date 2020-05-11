import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  nome: string;
  cpf: string;
  senha: string;
  usuarioTipoId: number;
  email: string;
  siape: string;
  dataIngresso: string;
  endereco: string;
  telCelular: string;
  telResidencial: string;
  titulacao: string;
  classe: string;
  nivel: string;
  regime: string;
  idLattes: number;
  formacao: string;
  resumo: string;
  cargo: string;
  status: number;
}

class CreateUserService {
  public async execute(UserData: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email: UserData.email },
    });

    if (checkUserExists) {
      throw new AppError('Email já existente');
    }

    const hashedPassword = await hash(UserData.senha, 8);

    const userData = UserData;

    userData.senha = hashedPassword;

    const user = usersRepository.create(userData);

    await usersRepository.save(user);

    delete user.senha;

    return user;
  }
}

export default CreateUserService;
