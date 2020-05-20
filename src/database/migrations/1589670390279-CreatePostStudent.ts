import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatePostStudent1589670390279
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'AlunoPos',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'orientadorUserId',
            type: 'int',
          },
          {
            name: 'areaId',
            type: 'int',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'matricula',
            type: 'varchar',
          },
          {
            name: 'statusCorrente',
            type: 'varchar',
          },
          {
            name: 'curso',
            type: 'varchar',
          },
          {
            name: 'regime',
            type: 'varchar',
          },
          {
            name: 'bolsista',
            type: 'tinyint',
          },
          {
            name: 'agenciaFomento',
            type: 'varchar',
          },
          {
            name: 'dataImplementacaoBolsa',
            type: 'date',
          },
          {
            name: 'dataIngresso',
            type: 'date',
          },
          {
            name: 'sede',
            type: 'varchar',
          },
          {
            name: 'endereco',
            type: 'varchar',
          },
          {
            name: 'bairro',
            type: 'varchar',
          },
          {
            name: 'cidade',
            type: 'varchar',
          },
          {
            name: 'uf',
            type: 'varchar',
          },
          {
            name: 'cep',
            type: 'varchar',
          },
          {
            name: 'dataNascimento',
            type: 'date',
          },
          {
            name: 'sexo',
            type: 'char',
          },
          {
            name: 'nacionalidade',
            type: 'varchar',
          },
          {
            name: 'estadoCivil',
            type: 'varchar',
          },
          {
            name: 'cpf',
            type: 'varchar',
          },
          {
            name: 'rg',
            type: 'varchar',
          },
          {
            name: 'orgaoExpedidor',
            type: 'varchar',
          },
          {
            name: 'dataExpedicao',
            type: 'varchar',
          },
          {
            name: 'telResidencial',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'telComercial',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'telCelular',
            type: 'varchar',
          },
          {
            name: 'nomePai',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'nomeMae',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cursoGraduacao',
            type: 'varchar',
          },
          {
            name: 'instituicaoGraduacao',
            type: 'varchar',
          },
          {
            name: 'coeficienteGraduacao',
            type: 'float',
          },
          {
            name: 'anoConclusaoGraduacao',
            type: 'int',
          },
          {
            name: 'idiomaExameProficiencia',
            type: 'varchar',
          },
          {
            name: 'conceitoExameProficiencia',
            type: 'varchar',
          },
          {
            name: 'dataExameProficiencia',
            type: 'date',
          },
          {
            name: 'status',
            type: 'int',
            default: 10,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'AlunoPos',
      new TableForeignKey({
        name: 'alunoPos_OrientadorUserId_foreingKey',
        columnNames: ['orientadorUserId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Usuario',
      }),
    );

    await queryRunner.createForeignKey(
      'AlunoPos',
      new TableForeignKey({
        name: 'alunoPos_areaId_foreingKey',
        columnNames: ['areaId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'AreaPesquisa',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('AlunoPos', 'alunoPos_areaId_foreingKey');
    await queryRunner.dropForeignKey(
      'AlunoPos',
      'alunoPos_OrientadorUserId_foreingKey',
    );

    await queryRunner.dropTable('AlunoPos');
  }
}
