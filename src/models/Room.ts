import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import RoomReserve from './RoomReserve';

@Entity('Sala')
class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => RoomReserve, roomReserve => roomReserve.sala)
  reserva: RoomReserve;

  @Column()
  numero: number;

  @Column()
  status: number;

  @Column()
  localizacao: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Room;
