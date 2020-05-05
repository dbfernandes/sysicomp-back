import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateUsers1588708658885 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'passwordResetToken',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'type_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'siape',
            type: 'varchar',
          },
          {
            name: 'ingressDate',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'cellPhone',
            type: 'varchar',
          },
          {
            name: 'homePhone',
            type: 'varchar',
          },
          {
            name: 'titraction',
            type: 'varchar',
          },
          {
            name: 'class',
            type: 'varchar',
          },
          {
            name: 'level',
            type: 'varchar',
          },
          {
            name: 'regime',
            type: 'varchar',
          },
          {
            name: 'inning',
            type: 'varchar',
          },
          {
            name: 'idLattes',
            type: 'int',
          },
          {
            name: 'formation',
            type: 'varchar',
          },
          {
            name: 'abstract',
            type: 'varchar',
          },
          {
            name: 'idRh',
            type: 'int',
          },
          {
            name: 'office',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'userTypeForeingKey',
        columnNames: ['type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'userType',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'userTypeForeingKey');
    await queryRunner.dropTable('users');
  }
}
