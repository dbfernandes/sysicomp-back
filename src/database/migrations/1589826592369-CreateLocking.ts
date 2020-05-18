import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateLocking1589826592369 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Trancamento',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'alunoPosId',
            type: 'int',
          },
          {
            name: 'responsavelUsuarioId',
            type: 'int',
          },
          {
            name: 'dataInicio',
            type: 'date',
          },
          {
            name: 'dataTermino',
            type: 'date',
          },
          {
            name: 'justificativa',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'observacao',
            type: 'varchar',
            isNullable: true,
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
      'Trancamento',
      new TableForeignKey({
        name: 'trancamento_alunoPosId_foreingKey',
        columnNames: ['alunoPosId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'AlunoPos',
      }),
    );

    await queryRunner.createForeignKey(
      'Trancamento',
      new TableForeignKey({
        name: 'trancamento_usuario_foreingKey',
        columnNames: ['responsavelUsuarioId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Usuario',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'Trancamento',
      'trancamento_usuario_foreingKey',
    );

    await queryRunner.dropForeignKey(
      'Trancamento',
      'trancamento_alunoPosId_foreingKey',
    );

    await queryRunner.dropTable('Trancamento');
  }
}
