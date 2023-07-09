import { EntityManager } from 'typeorm';
import { DataSourceHandler } from './dataSourceHandler';

export default abstract class TypeOrmRepository {
  get em(): EntityManager {
    return DataSourceHandler.getInstance().entityManager;
  }
}
