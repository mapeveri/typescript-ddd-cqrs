import { Migration } from '@mikro-orm/migrations';

export class Migration20240825130648 extends Migration {
  async up(): Promise<void> {
    this.addSql('drop table if exists "typeorm_migrations" cascade;');
  }

  async down(): Promise<void> {
    this.addSql(
      'create table "typeorm_migrations" ("id" serial, "timestamp" int8 not null, "name" varchar not null, constraint "PK_bb2f075707dd300ba86d0208923" primary key ("id"));',
    );
  }
}
