import { EntityRepository, Repository } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findUsersByType(type_id: number): Promise<User[]> {
    const findUsers = await this.find({
      where: { usuarioTipoId: type_id },
    });

    const users = findUsers;

    users.forEach(user => {
      delete user.senha; // eslint-disable-line
    });

    return findUsers;
  }
}

export default UsersRepository;
