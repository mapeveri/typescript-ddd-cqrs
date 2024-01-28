import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1706470114726 implements MigrationInterface {
    name = 'InitialMigration1706470114726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth_sessions" ("id" character varying NOT NULL, "session" json NOT NULL, CONSTRAINT "PK_641507381f32580e8479efc36cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "countries" ("id" character varying NOT NULL, "name" character varying NOT NULL, "iso" character varying NOT NULL, "languages" json NOT NULL DEFAULT '{"languages":[]}', CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "term" ("id" character varying, "type" character varying, "languageId" character varying, "countryId" character varying, "userId" character varying, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "terms" json DEFAULT '{"terms":[]}', CONSTRAINT "PK_55b0479f0743f2e5d5ec414821e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_19a144ebe2c3c451ea16ff1685" ON "term" ("type") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "name" character varying NOT NULL, "provider" character varying NOT NULL, "email" character varying NOT NULL, "photo" character varying NOT NULL, "interests" text NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_19a144ebe2c3c451ea16ff1685"`);
        await queryRunner.query(`DROP TABLE "term"`);
        await queryRunner.query(`DROP TABLE "countries"`);
        await queryRunner.query(`DROP TABLE "auth_sessions"`);
    }

}
