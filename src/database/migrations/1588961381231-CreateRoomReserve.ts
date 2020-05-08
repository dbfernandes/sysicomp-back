import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateRoomReserve1588961381231
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'SalaReserva',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'salaId',
            type: 'int',
          },
          {
            name: 'usuarioId',
            type: 'int',
          },
          {
            name: 'atividade',
            type: 'varchar',
          },
          {
            name: 'tipo',
            type: 'varchar',
          },
          {
            name: 'dataInicio',
            type: 'date',
          },
          {
            name: 'horaInicio',
            type: 'time',
          },
          {
            name: 'dataTermino',
            type: 'date',
          },
          {
            name: 'horaTermino',
            type: 'time',
          },
          {
            name: 'diasSemana',
            type: 'varchar',
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
      'SalaReserva',
      new TableForeignKey({
        name: 'salaIdForeingKey',
        columnNames: ['salaId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Sala',
      }),
    );

    await queryRunner.createForeignKey(
      'SalaReserva',
      new TableForeignKey({
        name: 'salaUsuarioIdForeingKey',
        columnNames: ['usuarioId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Usuario',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('SalaReserva', 'salaIdForeingKey');
    await queryRunner.dropForeignKey('SalaReserva', 'salaUsuarioIdForeingKey');
    await queryRunner.dropTable('SalaReserva');
  }
}
