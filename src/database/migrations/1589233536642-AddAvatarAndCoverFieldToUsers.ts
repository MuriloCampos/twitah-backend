import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddAvatarAndCoverFieldToUsers1589233536642 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('users', new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }));

      await queryRunner.addColumn('users', new TableColumn({
        name: 'cover',
        type: 'varchar',
        isNullable: true,
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('users', 'avatar');
      await queryRunner.dropColumn('users', 'cover');
    }

}
