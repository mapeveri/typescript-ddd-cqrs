import { Migration } from '@mikro-orm/migrations';

export class Migration20240819171047 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "auth_sessions" add column "created_at" timestamptz not null;');
    this.addSql('alter table "auth_sessions" alter column "id" drop default;');
    this.addSql('alter table "auth_sessions" alter column "id" type uuid using ("id"::text::uuid);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "auth_sessions" alter column "id" type text using ("id"::text);');
    this.addSql('alter table "auth_sessions" drop column "created_at";');
    this.addSql('alter table "auth_sessions" alter column "id" type varchar using ("id"::varchar);');
  }
}
