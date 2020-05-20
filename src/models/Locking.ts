import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import PostStudent from './PostStudent';
import User from './User';

@Entity('Trancamento')
class Locking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  alunoPosId: number;

  @OneToOne(() => PostStudent)
  @JoinColumn({ name: 'alunoPosId' })
  alunoPos: PostStudent;

  @Column()
  responsavelUsuarioId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'responsavelUsuarioId' })
  responsavelUsuario: User;

  @Column()
  dataInicio: Date;

  @Column()
  dataTermino: Date;

  @Column()
  justificativa: string;

  @Column()
  observacao: string;

  @Column()
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Locking;
