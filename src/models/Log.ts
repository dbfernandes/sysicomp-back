import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';
import PostStudent from './PostStudent';

@Entity('Log')
class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @Column()
  alunoPosId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuarioId' })
  usuario: User;

  @ManyToOne(() => PostStudent)
  @JoinColumn({ name: 'alunoPosId' })
  alunoPos: PostStudent;

  @Column()
  controller: string;

  @Column()
  action: string;

  @Column()
  ocorrencia: string;

  @CreateDateColumn()
  createdAt: Date;
}

export default Log;
