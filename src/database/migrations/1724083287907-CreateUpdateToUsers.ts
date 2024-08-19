import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUpdateToUsers1724083287907 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users RENAME COLUMN name TO fullName`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users CHANGE fullName name varchar(255) NULL`,
    );
  }
}
