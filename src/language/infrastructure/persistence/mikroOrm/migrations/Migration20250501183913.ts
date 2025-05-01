import { Migration } from '@mikro-orm/migrations';

export class Migration20250501183913 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      'create table "countries" ("id" uuid not null, "name" varchar(255) not null, "iso" varchar(10) not null, "languages" jsonb not null, constraint "countries_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "terms" ("id" uuid not null, "type" varchar(30) not null, "language_id" varchar(10) not null, "country_id" uuid not null, "user_id" uuid not null, "likes" jsonb not null, "created_at" timestamptz null, "updated_at" timestamptz null, "terms" jsonb null, constraint "terms_pkey" primary key ("id"));',
    );
    this.addSql('create index "terms_type_index" on "terms" ("type");');
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists "countries" cascade;');

    this.addSql('drop table if exists "terms" cascade;');
  }
}
