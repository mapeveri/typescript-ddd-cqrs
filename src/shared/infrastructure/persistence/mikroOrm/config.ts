import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { entitySchemas } from '@src/shared/_dependencyInjection/entitySchemas';

export const mikroOrmConfiguration = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    entities: entitySchemas,
    entitiesTs: entitySchemas,
    driver: PostgreSqlDriver,
    clientUrl: configService.get('POSTGRESQL_DB_URL'),
    debug: process.env.ENV != 'production',
  }),
};
