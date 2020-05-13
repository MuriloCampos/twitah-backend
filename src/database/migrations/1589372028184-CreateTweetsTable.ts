import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTweetsTable1589372028184 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

      await queryRunner.createTable(
        new Table({
          name: 'tweets',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'message',
              type: 'varchar'
            },
            {
              name: 'date',
              type: 'timestamp with time zone',
            },
            {
              name: 'user_id',
              type: 'uuid',
            }
          ]
        })
      );

    await queryRunner.createForeignKey(
      'tweets',
      new TableForeignKey({
        name: 'TweetUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropTable('tweets');

      await queryRunner.dropForeignKey('tweets', 'TweetUser');
    }

}
