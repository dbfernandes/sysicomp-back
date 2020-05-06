import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import User from './User';

@Entity('UsuarioTipo')
class UserType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => User, user => user.usuarioTipo)
  usuario: User;
}

export default UserType;
