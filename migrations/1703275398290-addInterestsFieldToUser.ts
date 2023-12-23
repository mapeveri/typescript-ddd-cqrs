import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInterestsFieldToUser1703275398290 implements MigrationInterface {
  name = 'AddInterestsFieldToUser1703275398290';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "interests" text NULL`);
    await queryRunner.query(`UPDATE "users" SET "interests" = ARRAY[]::varchar[]`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "interests" SET NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "interests"`);
  }
}
