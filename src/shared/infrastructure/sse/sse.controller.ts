import { Controller, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SseService } from './sse.service';

@Controller('sse')
export class SseController {
  constructor(private readonly sseService: SseService) {}

  @Sse('notifications')
  sse(): Observable<MessageEvent> {
    return this.sseService.getEventStream();
  }
}
