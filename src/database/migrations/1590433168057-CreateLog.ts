import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateLog1590433168057 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Log',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'usuarioId',
            type: 'int',
          },
          {
            name: 'alunoPosId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'controller',
            type: 'varchar',
          },
          {
            name: 'action',
            type: 'varchar',
          },
          {
            name: 'ocorrencia',
            type: 'longtext',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'Log',
      new TableForeignKey({
        name: 'log_usuarioId',
        columnNames: ['usuarioId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Usuario',
      }),
    );

    await queryRunner.createForeignKey(
      'Log',
      new TableForeignKey({
        name: 'log_alunoPosId',
        columnNames: ['alunoPosId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'AlunoPos',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Log', 'log_alunoPosId');
    await queryRunner.dropForeignKey('Log', 'log_usuarioId');
    await queryRunner.dropTable('Log');
  }
}
