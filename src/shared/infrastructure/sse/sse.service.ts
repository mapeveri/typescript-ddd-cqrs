import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SseService {
  private eventSubject = new Subject<MessageEvent>();

  sendEventToClients(eventData: any, eventType?: string) {
    const event = new MessageEvent(eventType || 'message', {
      data: JSON.stringify(eventData),
    });
    this.eventSubject.next(event);
  }

  getEventStream(): Observable<MessageEvent> {
    return this.eventSubject.asObservable();
  }
}
