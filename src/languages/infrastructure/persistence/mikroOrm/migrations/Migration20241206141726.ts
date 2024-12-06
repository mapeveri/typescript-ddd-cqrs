import { Migration } from '@mikro-orm/migrations';

export class Migration20241206141726 extends Migration {
  override async up(): Promise<void> {
    this.addSql('drop table if exists "auth_sessions" cascade;');
  }

  override async down(): Promise<void> {
    this.addSql(
      'create table "auth_sessions" ("id" uuid not null, "session" json not null, "created_at" timestamptz(6) not null, constraint "PK_641507381f32580e8479efc36cd" primary key ("id"));',
    );
  }
}
