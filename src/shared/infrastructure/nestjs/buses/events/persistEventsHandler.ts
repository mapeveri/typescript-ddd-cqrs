import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { DomainEvent } from '@src/shared/domain/buses/eventBus/domainEvent';
import { EVENT_STORE_REPOSITORY, EventStoreRepository } from '@src/shared/domain/eventStore/eventStoreRepository';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { mongoTransactionalOperation } from '@src/shared/infrastructure/persistence/mongo/mongoTransactionalDecorator';
import { Subject, takeUntil } from 'rxjs';

@Injectable()
export class PersistEventsHandler {
  private destroy$ = new Subject<void>();

  constructor(
    private eventBus: EventBus,
    @Inject(EVENT_STORE_REPOSITORY) private eventStoreRepository: EventStoreRepository
  ) {
    this.eventBus.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      void mongoTransactionalOperation(async (event: DomainEvent) => {
        void this.eventStoreRepository.save(event);
      }, event as DomainEvent);
    });
  }

  onModuleDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
