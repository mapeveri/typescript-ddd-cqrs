import { Migration } from '@mikro-orm/migrations';

export class Migration20240902192916 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "terms" ("id" uuid not null, "type" varchar(30) not null, "language_id" varchar(10) not null, "country_id" uuid not null, "user_id" uuid not null, "likes" jsonb not null, "created_at" timestamptz null, "updated_at" timestamptz null, "terms" jsonb null, constraint "terms_pkey" primary key ("id"));',
    );
    this.addSql('create index "terms_type_index" on "terms" ("type");');

    this.addSql('drop table if exists "term" cascade;');
  }

  async down(): Promise<void> {
    this.addSql(
      'create table "term" ("id" uuid not null, "type" varchar(30) not null, "language_id" varchar(10) not null, "country_id" uuid not null, "user_id" uuid not null, "likes" jsonb not null, "created_at" timestamptz(6) null, "updated_at" timestamptz(6) null, "terms" jsonb null, constraint "term_pkey" primary key ("id"));',
    );
    this.addSql('create index "term_type_index" on "term" ("type");');

    this.addSql('drop table if exists "terms" cascade;');
  }
}
