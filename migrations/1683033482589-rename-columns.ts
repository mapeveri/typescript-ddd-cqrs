import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameColumns1683033482589 implements MigrationInterface {
  name = 'MigrationName1683033482589';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "words" DROP COLUMN "language_id"`);
    await queryRunner.query(`ALTER TABLE "words" DROP COLUMN "country_id"`);
    await queryRunner.query(`ALTER TABLE "words" ADD "languageId" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "words" ADD "countryId" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "words" DROP COLUMN "countryId"`);
    await queryRunner.query(`ALTER TABLE "words" DROP COLUMN "languageId"`);
    await queryRunner.query(`ALTER TABLE "words" ADD "country_id" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "words" ADD "language_id" character varying NOT NULL`);
  }
}
