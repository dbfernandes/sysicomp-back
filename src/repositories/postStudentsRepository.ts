import { EntityRepository, Repository } from 'typeorm';

import PostStudent from '../models/PostStudent';

@EntityRepository(PostStudent)
class PostStudentsRepository extends Repository<PostStudent> {
  public async getSortedPostStudents(
    loadEager: number,
  ): Promise<PostStudent[]> {
    const postStudents = await this.find({
      loadEagerRelations: loadEager === 1,
    });

    postStudents.sort((a, b) => {
      if (a.nome.toLowerCase() < b.nome.toLowerCase()) return -1;
      if (a.nome.toLowerCase() > b.nome.toLowerCase()) return 1;
      return 0;
    });

    return postStudents;
  }
}

export default PostStudentsRepository;
