import { Migration } from '@mikro-orm/migrations';

export class Migration20240818132015 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "countries" alter column "languages" drop default;');
    this.addSql('alter table "countries" alter column "languages" type jsonb using ("languages"::jsonb);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "countries" alter column "languages" type jsonb using ("languages"::jsonb);');
    this.addSql('alter table "countries" alter column "languages" set default \'{"languages": []}\';');
  }

}
