import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1682870146619 implements MigrationInterface {
  name = 'CreateInitialTables1682870146619';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "countries" ("id" uuid NOT NULL, "name" character varying NOT NULL, "iso" character varying NOT NULL, "languages" text NOT NULL DEFAULT '[]', CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "expressions" ("id" uuid NOT NULL, "language_id" character varying NOT NULL, "country_id" character varying NOT NULL, "terms" text NOT NULL DEFAULT '[]', "userId" uuid, CONSTRAINT "PK_e75aa87c24b37cd86f6c8a668c9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL, "name" character varying NOT NULL, "provider" character varying NOT NULL, "email" character varying NOT NULL, "photo" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "words" ("id" uuid NOT NULL, "language_id" character varying NOT NULL, "country_id" character varying NOT NULL, "terms" text NOT NULL DEFAULT '[]', "userId" uuid, CONSTRAINT "PK_feaf97accb69a7f355fa6f58a3d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "expressions" ADD CONSTRAINT "FK_d6fc57a835713d8565153ff1807" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "words" ADD CONSTRAINT "FK_3f75018aa783695bfd293f0dc26" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "words" DROP CONSTRAINT "FK_3f75018aa783695bfd293f0dc26"`);
    await queryRunner.query(`ALTER TABLE "expressions" DROP CONSTRAINT "FK_d6fc57a835713d8565153ff1807"`);
    await queryRunner.query(`DROP TABLE "words"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "expressions"`);
    await queryRunner.query(`DROP TABLE "countries"`);
  }
}
