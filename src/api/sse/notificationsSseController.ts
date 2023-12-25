import { Controller, ForbiddenException, Req, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SseService } from './sseService';
import { Request } from 'express';

@Controller('sse')
export class NotificationsSseController {
  constructor(private readonly sseService: SseService) {}

  @Sse('notifications')
  sse(@Req() req: Request): Observable<MessageEvent> {
    const room = typeof req.query.room === 'string' ? req.query.room : undefined;
    if (!room) {
      throw new ForbiddenException();
    }

    this.sseService.join(room);

    return this.sseService.getEventStream(room);
  }
}
