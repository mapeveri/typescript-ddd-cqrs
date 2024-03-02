import { Module } from '@nestjs/common';
import { LanguageModule } from './languages/language.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from './shared/infrastructure/persistence/typeOrm/dataSource';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceConfig),
    SharedModule,
    LanguageModule,
  ],
})
export class AppModule {}
