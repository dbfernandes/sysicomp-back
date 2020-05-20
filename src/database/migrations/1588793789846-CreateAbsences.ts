import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAbsences1588793789846 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Afastamento',
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
            name: 'destino',
            type: 'varchar',
          },
          {
            name: 'tipo',
            type: 'varchar',
          },
          {
            name: 'dataSaida',
            type: 'date',
          },
          {
            name: 'dataRetorno',
            type: 'date',
          },
          {
            name: 'justificativa',
            type: 'longtext',
          },
          {
            name: 'planoReposicao',
            type: 'longtext',
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
      'Afastamento',
      new TableForeignKey({
        name: 'usuarioIdForeingKey',
        columnNames: ['usuarioId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Usuario',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Afastamento', 'usuarioIdForeingKey');
    await queryRunner.dropTable('Afastamento');
  }
}
