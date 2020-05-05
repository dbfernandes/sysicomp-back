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

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  passwordResetToken: string;

  @Column()
  type_id: number;

  @ManyToOne(() => UserType, userType => userType.user)
  @JoinColumn({ name: 'type_id' })
  type: UserType;

  @Column()
  email: string;

  @Column()
  siape: string;

  @Column()
  ingressDate: string;

  @Column()
  address: string;

  @Column()
  cellPhone: string;

  @Column()
  homePhone: string;

  @Column()
  titraction: string;

  @Column()
  class: string;

  @Column()
  level: string;

  @Column()
  regime: string;

  @Column()
  inning: string;

  @Column()
  idLattes: number;

  @Column()
  formation: string;

  @Column()
  abstract: string;

  @Column()
  idRh: number;

  @Column()
  office: string;

  @Column()
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
