import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAuthSessionTable1689433983736 implements MigrationInterface {
  name = 'AddAuthSessionTable1689433983736';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "auth_sessions" ("id" character varying NOT NULL, "session" json NOT NULL, CONSTRAINT "PK_641507381f32580e8479efc36cd" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "auth_sessions"`);
  }
}
