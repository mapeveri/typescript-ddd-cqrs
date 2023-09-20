import { Injectable } from '@nestjs/common';
import { UnhandledExceptionBus } from '@nestjs/cqrs';
import { Subject, takeUntil } from 'rxjs';

@Injectable()
export class UnhandledExceptionsBusHandler {
  private destroy$ = new Subject<void>();

  constructor(private readonly unhandledExceptionsBus: UnhandledExceptionBus) {
    this.unhandledExceptionsBus.pipe(takeUntil(this.destroy$)).subscribe((exceptionInfo) => {
      console.log(exceptionInfo.exception);
      console.log(exceptionInfo.cause);
    });
  }

  onModuleDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
