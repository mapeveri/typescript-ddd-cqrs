import { Module } from '@nestjs/common';
import { LanguageModule } from './languages/language.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entitySchemas } from './shared/_dependencyInjection/entitySchemas';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRESQL_DB_URL,
      synchronize: false,
      logging: true,
      entities: entitySchemas,
      subscribers: [],
      migrationsRun: true,
      autoLoadEntities: false,
      logger: 'advanced-console',
      migrations: [`${__dirname}../migrations/**/*{.ts,.js}`],
      poolSize: 10,
    }),
    SharedModule,
    LanguageModule,
  ],
})
export class AppModule {}
