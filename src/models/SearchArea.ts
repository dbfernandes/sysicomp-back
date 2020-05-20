import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import PostStudent from './PostStudent';

@Entity('AreaPesquisa')
class SearchArea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  icone: string;

  @Column()
  sigla: string;

  @Column()
  cor: string;

  @Column()
  descricao: string;

  @OneToMany(() => PostStudent, postStudent => postStudent.area)
  alunoPos: PostStudent;

  @Column()
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default SearchArea;
