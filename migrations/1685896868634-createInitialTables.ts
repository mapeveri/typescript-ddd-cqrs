import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1685896868634 implements MigrationInterface {
  name = 'CreateInitialTables1685896868634';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "countries" ("id" character varying NOT NULL, "name" character varying NOT NULL, "iso" character varying NOT NULL, "languages" json NOT NULL DEFAULT '{"languages":[]}', CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "expressions" ("id" character varying NOT NULL, "languageId" character varying NOT NULL, "countryId" character varying NOT NULL, "terms" json NOT NULL DEFAULT '{"terms":[]}', "userId" character varying NOT NULL, CONSTRAINT "PK_e75aa87c24b37cd86f6c8a668c9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" character varying NOT NULL, "name" character varying NOT NULL, "provider" character varying NOT NULL, "email" character varying NOT NULL, "photo" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "words" ("id" character varying NOT NULL, "languageId" character varying NOT NULL, "countryId" character varying NOT NULL, "terms" json NOT NULL DEFAULT '{"terms":[]}', "userId" character varying NOT NULL, CONSTRAINT "PK_feaf97accb69a7f355fa6f58a3d" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "words"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "expressions"`);
    await queryRunner.query(`DROP TABLE "countries"`);
  }
}
