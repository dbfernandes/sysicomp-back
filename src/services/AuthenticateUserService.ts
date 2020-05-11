import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  cpf: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ cpf, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { cpf },
    });

    if (!user) {
      throw new AppError('CPF ou Senha incorretos');
    }

    const passwordMatched = await compare(password, user.senha);

    if (!passwordMatched) {
      throw new AppError('CPF ou Senha incorretos');
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      expiresIn,
      subject: user.id.toString(),
    });

    delete user.senha;

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
