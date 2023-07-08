import { EntityManager } from 'typeorm';
import { DataSourceHandler } from './dataSource';

export default abstract class TypeOrmRepository {
  get em(): EntityManager {
    return DataSourceHandler.getInstance().entityManager;
  }
}
