import { EntityRepository, Repository } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findUsersByType(type_id: number): Promise<User[] | null> {
    const findUsers = await this.find({
      where: { type_id },
    });

    const users = findUsers;

    users.forEach(user => {
      delete user.password; // eslint-disable-line
    });

    return findUsers || null;
  }
}

export default UsersRepository;
