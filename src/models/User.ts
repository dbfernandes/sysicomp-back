import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import UserType from './UserType';

@Entity('Usuario')
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  senha: string;

  @Column()
  senhaResetToken: string;

  @Column()
  usuarioTipoId: number;

  @ManyToOne(() => UserType, userType => userType.usuario)
  @JoinColumn({ name: 'usuarioTipoId' })
  usuarioTipo: UserType;

  @Column()
  email: string;

  @Column()
  siape: string;

  @Column()
  dataIngresso: Date;

  @Column()
  endereco: string;

  @Column()
  telCelular: string;

  @Column()
  telResidencial: string;

  @Column()
  titulacao: string;

  @Column()
  classe: string;

  @Column()
  nivel: string;

  @Column()
  regime: string;

  @Column()
  turno: string;

  @Column()
  idLattes: number;

  @Column()
  formacao: string;

  @Column()
  resumo: string;

  @Column()
  cargo: string;

  @Column()
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default User;
