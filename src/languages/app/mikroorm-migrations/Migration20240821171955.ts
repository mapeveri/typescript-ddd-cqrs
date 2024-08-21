import { Migration } from '@mikro-orm/migrations';

export class Migration20240821171955 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "users" alter column "email" type varchar(100) using ("email"::varchar(100));');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" alter column "email" type varchar using ("email"::varchar);');
  }
}
