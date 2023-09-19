import { Injectable } from '@nestjs/common';
import { UnhandledExceptionBus } from '@nestjs/cqrs';
import { SseService } from '@src/shared/infrastructure/sse/sse.service';
import { Subject, takeUntil } from 'rxjs';

@Injectable()
export class UnhandledExceptionsBusHandler {
  private destroy$ = new Subject<void>();

  constructor(private sseService: SseService, private unhandledExceptionsBus: UnhandledExceptionBus) {
    this.unhandledExceptionsBus.pipe(takeUntil(this.destroy$)).subscribe((exceptionInfo) => {
      console.log(exceptionInfo.exception);
      console.log(exceptionInfo.cause);
      this.sseService.sendEventToClients(exceptionInfo.exception.message, 'event_errors');
    });
  }

  onModuleDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
