import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import User from './User';

@Entity('Afastamento')
class Abscence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuarioId' })
  usuario: User;

  @Column()
  destino: string;

  @Column()
  tipo: 'nacional' | 'internacional';

  @Column()
  dataSaida: Date;

  @Column()
  dataRetorno: Date;

  @Column()
  justificativa: string;

  @Column()
  planoReposicao: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Abscence;
