import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Room from './Room';

@Entity('SalaReserva')
class RoomReserve {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  salaId: number;

  @ManyToOne(() => Room, room => room.reserva)
  @JoinColumn({ name: 'salaId' })
  sala: Room;

  @Column()
  usuarioId: number;

  @Column()
  atividade: string;

  @Column()
  tipo: string;

  @Column()
  dataInicio: Date;

  @Column()
  horaInicio: string;

  @Column()
  dataTermino: Date;

  @Column()
  horaTermino: string;

  @Column()
  diasSemana: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default RoomReserve;
