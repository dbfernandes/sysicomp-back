import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSearchArea1589669629082
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'AreaPesquisa',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'icone',
            type: 'varchar',
          },
          {
            name: 'sigla',
            type: 'varchar',
          },
          {
            name: 'cor',
            type: 'varchar',
          },
          {
            name: 'descricao',
            type: 'longtext',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('AreaPesquisa');
  }
}
