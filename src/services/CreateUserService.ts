import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  name: string;
  password: string;
  type_id: number;
  email: string;
  siape: string;
  ingressDate: string;
  address: string;
  cellPhone: string;
  homePhone: string;
  titraction: string;
  class: string;
  level: string;
  regime: string;
  idLattes: number;
  formation: string;
  abstract: string;
  idRh: number;
  office: string;
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

    const hashedPassword = await hash(UserData.password, 8);

    const userData = UserData;

    userData.password = hashedPassword;

    const user = usersRepository.create(userData);

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
