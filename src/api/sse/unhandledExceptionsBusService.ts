import { Injectable } from '@nestjs/common';
import { UnhandledExceptionBus } from '@nestjs/cqrs';
import { SseService } from '@src/api/sse/sseService';
import { Subject, takeUntil } from 'rxjs';

@Injectable()
export class UnhandledExceptionsBusService {
  private destroy$ = new Subject<void>();

  constructor(private readonly unhandledExceptionsBus: UnhandledExceptionBus, private readonly sseService: SseService) {
    this.unhandledExceptionsBus.pipe(takeUntil(this.destroy$)).subscribe((exceptionInfo) => {
      console.log(exceptionInfo.exception);
      console.log(exceptionInfo.cause);

      const roomId = (exceptionInfo.cause as any)?.userId;
      if (!roomId) {
        return;
      }
      this.sseService.sendEventToClients(exceptionInfo.exception.message, 'bus_errors', roomId);
    });
  }

  onModuleDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
