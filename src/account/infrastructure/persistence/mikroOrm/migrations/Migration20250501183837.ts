import { Migration } from '@mikro-orm/migrations';

export class Migration20250501183837 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      'create table "users" ("id" uuid not null, "name" varchar(255) not null, "provider" varchar(75) not null, "email" varchar(100) not null, "photo" varchar(500) null, "interests" text[] null, constraint "users_pkey" primary key ("id"));',
    );
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;');
  }
}
