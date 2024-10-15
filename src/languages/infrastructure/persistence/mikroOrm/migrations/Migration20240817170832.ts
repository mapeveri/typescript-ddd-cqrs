import { Migration } from '@mikro-orm/migrations';

export class Migration20240817170832 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "users" alter column "id" drop default;');
    this.addSql('alter table "users" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "users" alter column "name" type varchar(255) using ("name"::varchar(255));');
    this.addSql('alter table "users" alter column "provider" type varchar(75) using ("provider"::varchar(75));');
    this.addSql('alter table "users" alter column "email" type varchar using ("email"::varchar);');
    this.addSql('alter table "users" alter column "photo" type varchar(500) using ("photo"::varchar(500));');
    this.addSql('alter table "users" alter column "photo" drop not null;');
    this.addSql('alter table "users" alter column "interests" type text[] using ("interests"::text[]);');
    this.addSql('alter table "users" alter column "interests" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" alter column "id" type text using ("id"::text);');
    this.addSql('alter table "users" alter column "id" type varchar using ("id"::varchar);');
    this.addSql('alter table "users" alter column "name" type varchar using ("name"::varchar);');
    this.addSql('alter table "users" alter column "provider" type varchar using ("provider"::varchar);');
    this.addSql('alter table "users" alter column "email" type varchar using ("email"::varchar);');
    this.addSql('alter table "users" alter column "photo" type varchar using ("photo"::varchar);');
    this.addSql('alter table "users" alter column "photo" set not null;');
    this.addSql('alter table "users" alter column "interests" type text using ("interests"::text);');
    this.addSql('alter table "users" alter column "interests" set not null;');
  }
}
