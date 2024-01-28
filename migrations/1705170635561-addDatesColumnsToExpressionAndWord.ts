import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDatesColumnsToExpressionAndWord1705170635561 implements MigrationInterface {
  name = 'AddDatesColumnsToExpressionAndWord1705170635561';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "expressions" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "expressions" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "words" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "words" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "words" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "words" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "expressions" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "expressions" DROP COLUMN "created_at"`);
  }
}
