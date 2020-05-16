import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from './User';
import SearchArea from './SearchArea';

@Entity('AlunoPos')
class PostStudent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orientadorUserId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'orientadorUserId' })
  orientador: User;

  @Column()
  areaId: number;

  @ManyToOne(() => SearchArea)
  @JoinColumn({ name: 'areaId' })
  area: SearchArea;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  matricula: string;

  @Column()
  statusCorrente:
    | 'Ativo'
    | 'Egresso'
    | 'Desistente'
    | 'Desligado'
    | 'Jubilado'
    | 'Trancado';

  @Column()
  curso: 'Mestrado' | 'Doutorado';

  @Column()
  regime: 'Intergral' | 'Parcial';

  @Column()
  bolsista: boolean;

  @Column()
  agenciaFomento: string;

  @Column()
  dataImplementacaoBolsa: Date;

  @Column()
  dataIngresso: Date;

  @Column()
  sede: string;

  @Column()
  endereco: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column()
  uf: string;

  @Column()
  cep: string;

  @Column()
  dataNascimento: Date;

  @Column()
  sexo: 'M' | 'F';

  @Column()
  nacionalidade: string;

  @Column()
  estadoCivil: string;

  @Column()
  cpf: string;

  @Column()
  rg: string;

  @Column()
  orgaoExpeditor: string;

  @Column()
  dataExpedicao: Date;

  @Column()
  telResidencial: string;

  @Column()
  telComercial: string;

  @Column()
  telCelular: string;

  @Column()
  nomePai: string;

  @Column()
  nomeMae: string;

  @Column()
  cursoGraduacao: string;

  @Column()
  instituicaoGraduacao: string;

  @Column()
  coeficienteGraduacao: number;

  @Column()
  anoConclusaoGraduacao: number;

  @Column()
  idiomaExameProficiencia: string;

  @Column()
  conceitoExameProficiencia: 'Aprovado' | 'Reprovado';

  @Column()
  dataExameProficiencia: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default PostStudent;
