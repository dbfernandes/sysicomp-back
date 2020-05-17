import { EntityRepository, Repository } from 'typeorm';

import PostStudent from '../models/PostStudent';

import parseDateAsString from '../utils/parseDateAsString';

interface FilterOptions {
  matricula: string;
  nome: string;
  curso: 'Mestrado' | 'Doutorado';
  status:
  | 'Ativo'
  | 'Egresso'
  | 'Desistente'
  | 'Desligado'
  | 'Jubilado'
  | 'Trancado';
  ingresso: string;
  orientador: string;
  linha_pesquisa: string;
}

@EntityRepository(PostStudent)
class PostStudentsRepository extends Repository<PostStudent> {
  public async getSortedPostStudents(
    loadEager: number,
    filterOptions: FilterOptions | any,
  ): Promise<PostStudent[]> {
    if (filterOptions) loadEager = 1;

    const postStudents = await this.find({
      loadEagerRelations: loadEager === 1,
    });

    postStudents.sort((a, b) => {
      if (a.nome.toLowerCase() < b.nome.toLowerCase()) return -1;
      if (a.nome.toLowerCase() > b.nome.toLowerCase()) return 1;
      return 0;
    });

    if (filterOptions) {
      const filteredResult = postStudents.filter(student => {
        if (filterOptions.nome) {
          if (
            student.nome
              .toLowerCase()
              .indexOf(filterOptions.nome.toLowerCase()) === -1
          ) {
            return false;
          }
        }

        if (filterOptions.matricula) {
          if (
            student.matricula
              .toLowerCase()
              .indexOf(filterOptions.matricula.toLowerCase()) === -1
          ) {
            return false;
          }
        }

        if (filterOptions.curso) {
          if (student.curso !== filterOptions.curso) return false;
        }

        if (filterOptions.ingresso) {
          const date = parseDateAsString(student.dataIngresso);

          if (date.indexOf(filterOptions.ingresso) === -1) {
            return false;
          }
        }

        if (filterOptions.orientador) {
          if (
            student.orientador.nome
              .toLowerCase()
              .indexOf(filterOptions.orientador.toLowerCase()) === -1
          ) {
            return false;
          }
        }

        if (filterOptions.linha_pesquisa) {
          if (student.area.sigla !== filterOptions.linha_pesquisa) return false;
        }

        return true;
      });

      return filteredResult;
    }

    return postStudents;
  }
}

export default PostStudentsRepository;
