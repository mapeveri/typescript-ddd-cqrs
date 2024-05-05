import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLikesToTermTable1714908293548 implements MigrationInterface {
  name = 'AddLikesToTermTable1714908293548';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "term" ADD "likes" json NOT NULL DEFAULT '{"termLikes":[]}'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "term" DROP COLUMN "likes"`);
  }
}
