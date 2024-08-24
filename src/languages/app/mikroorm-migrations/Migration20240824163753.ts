import { Migration } from '@mikro-orm/migrations';

export class Migration20240824163753 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "term" drop column "languageId", drop column "countryId", drop column "userId";');

    this.addSql(
      'alter table "term" add column "language_id" varchar(10) not null, add column "country_id" uuid not null, add column "user_id" uuid not null, add column "likes" jsonb not null;',
    );
    this.addSql('alter table "term" alter column "id" drop default;');
    this.addSql('alter table "term" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "term" alter column "type" type varchar(30) using ("type"::varchar(30));');
    this.addSql('alter table "term" alter column "type" set not null;');
    this.addSql('alter table "term" alter column "created_at" drop default;');
    this.addSql('alter table "term" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "term" alter column "updated_at" drop default;');
    this.addSql('alter table "term" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "term" alter column "terms" drop default;');
    this.addSql('alter table "term" alter column "terms" type jsonb using ("terms"::jsonb);');
    this.addSql('alter index "IDX_19a144ebe2c3c451ea16ff1685" rename to "term_type_index";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "term" alter column "id" type text using ("id"::text);');

    this.addSql(
      'alter table "term" drop column "language_id", drop column "country_id", drop column "user_id", drop column "likes";',
    );

    this.addSql(
      'alter table "term" add column "languageId" varchar null, add column "countryId" varchar null, add column "userId" varchar null;',
    );
    this.addSql('alter table "term" alter column "id" type varchar using ("id"::varchar);');
    this.addSql('alter table "term" alter column "type" type varchar using ("type"::varchar);');
    this.addSql('alter table "term" alter column "type" drop not null;');
    this.addSql('alter table "term" alter column "created_at" type timestamp(6) using ("created_at"::timestamp(6));');
    this.addSql('alter table "term" alter column "created_at" set default now();');
    this.addSql('alter table "term" alter column "updated_at" type timestamp(6) using ("updated_at"::timestamp(6));');
    this.addSql('alter table "term" alter column "updated_at" set default now();');
    this.addSql('alter table "term" alter column "terms" type json using ("terms"::json);');
    this.addSql('alter table "term" alter column "terms" set default \'{"terms":[]}\';');
    this.addSql('alter index "term_type_index" rename to "IDX_19a144ebe2c3c451ea16ff1685";');
  }
}
