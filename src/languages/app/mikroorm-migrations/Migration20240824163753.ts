import { Migration } from '@mikro-orm/migrations';

export class Migration20240824163753 extends Migration {
  async up(): Promise<void> {
    this.addSql('drop table if exists "term" cascade;');
  }

  async down(): Promise<void> {
    this.addSql(
      'CREATE TABLE "term" ("id" character varying, "type" character varying, "languageId" character varying, "countryId" character varying, "userId" character varying, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "terms" json DEFAULT \'{"terms":[]}\', CONSTRAINT "PK_55b0479f0743f2e5d5ec414821e" PRIMARY KEY ("id"))',
    );
    this.addSql('CREATE INDEX "IDX_19a144ebe2c3c451ea16ff1685" ON "term" ("type") ');
  }
}
