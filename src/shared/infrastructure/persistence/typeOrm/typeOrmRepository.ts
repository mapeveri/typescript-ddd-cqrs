import { EntityManager } from 'typeorm';
import { queryRunner } from './dataSource';

export default abstract class TypeOrmRepository {
  protected em: EntityManager;

  constructor() {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    const qr = await queryRunner;
    this.em = qr.manager;
  }
}
