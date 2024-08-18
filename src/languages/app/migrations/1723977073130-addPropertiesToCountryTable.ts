import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPropertiesToCountryTable1723977073130 implements MigrationInterface {
  name = 'AddPropertiesToCountryTable1723977073130';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "countries" ALTER COLUMN "id" SET DATA TYPE uuid USING "id"::uuid`);
    await queryRunner.query(`ALTER TABLE "countries" ALTER COLUMN "id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "countries" ALTER COLUMN "name" SET DATA TYPE character varying(255)`);
    await queryRunner.query(`ALTER TABLE "countries" ALTER COLUMN "name" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "countries" ALTER COLUMN "iso" SET DATA TYPE character varying(10)`);
    await queryRunner.query(`ALTER TABLE "countries" ALTER COLUMN "iso" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "countries" ALTER COLUMN "languages" SET DATA TYPE jsonb`);
    await queryRunner.query(`ALTER TABLE "countries" ALTER COLUMN "languages" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "countries" ALTER COLUMN "languages" SET DEFAULT '{"languages":[]}'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "countries" ALTER COLUMN "languages" SET DATA TYPE json`);
    await queryRunner.query(`ALTER TABLE "countries" ALTER COLUMN "languages" SET DEFAULT '{"languages":[]}'`);
    await queryRunner.query(`ALTER TABLE "countries" ALTER COLUMN "iso" SET DATA TYPE character varying`);
    await queryRunner.query(`ALTER TABLE "countries" ALTER COLUMN "name" SET DATA TYPE character varying`);
    await queryRunner.query(`ALTER TABLE "countries" ALTER COLUMN "id" SET DATA TYPE character varying`);
  }
}
