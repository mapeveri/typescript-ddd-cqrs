import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { DomainEvent } from '@src/shared/domain/bus/eventBus/domainEvent';
import { mongoTransactionalOperation } from '@src/shared/infrastructure/persistence/mongo/mongoTransactionalDecorator';
import { Subject, takeUntil } from 'rxjs';
import MongoEventStoreRepository from '@src/shared/infrastructure/persistence/mongo/repositories/mongoEventStoreRepository';

@Injectable()
export class PersistDomainEventsSubscriber {
  private destroy$ = new Subject<void>();

  constructor(
    private readonly eventBus: EventBus,
    private readonly mongoEventStoreRepository: MongoEventStoreRepository,
  ) {
    this.eventBus.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      void mongoTransactionalOperation(async (event: DomainEvent) => {
        void this.mongoEventStoreRepository.save(event);
      }, event as DomainEvent);
    });
  }

  onModuleDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
