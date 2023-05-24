import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTermsExpressionField1684934940677 implements MigrationInterface {
  name = 'UpdateTermsExpressionField1684934940677';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "expressions" ALTER COLUMN "terms" SET DEFAULT '{"terms":[]}'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "expressions" ALTER COLUMN "terms" SET DEFAULT '[]'`);
  }
}
