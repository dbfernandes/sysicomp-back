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
        name: 'Usuario',
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
            name: 'cpf',
            type: 'varchar',
          },
          {
            name: 'senha',
            type: 'varchar',
          },
          {
            name: 'senhaResetToken',
            type: 'varchar',
            isNullable: true,
            default: null,
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'usuarioTipoId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'siape',
            type: 'varchar',
          },
          {
            name: 'dataIngresso',
            type: 'date',
          },
          {
            name: 'endereco',
            type: 'varchar',
          },
          {
            name: 'telCelular',
            type: 'varchar',
          },
          {
            name: 'telResidencial',
            type: 'varchar',
          },
          {
            name: 'titulacao',
            type: 'varchar',
          },
          {
            name: 'classe',
            type: 'varchar',
          },
          {
            name: 'nivel',
            type: 'varchar',
          },
          {
            name: 'regime',
            type: 'varchar',
          },
          {
            name: 'turno',
            type: 'varchar',
          },
          {
            name: 'idLattes',
            type: 'int',
          },
          {
            name: 'formacao',
            type: 'varchar',
          },
          {
            name: 'resumo',
            type: 'varchar',
          },
          {
            name: 'cargo',
            type: 'varchar',
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
      'Usuario',
      new TableForeignKey({
        name: 'usuarioTipoForeingKey',
        columnNames: ['usuarioTipoId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'UsuarioTipo',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Usuario', 'usuarioTipoForeingKey');
    await queryRunner.dropTable('Usuario');
  }
}
