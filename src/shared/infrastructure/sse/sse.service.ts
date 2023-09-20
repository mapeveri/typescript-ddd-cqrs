import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SseService {
  private eventSubjects = new Map<string, Subject<MessageEvent>>();

  join(room: string) {
    if (!this.eventSubjects.has(room)) {
      this.eventSubjects.set(room, new Subject<MessageEvent>());
    }
  }

  sendEventToClients(eventData: any, eventType: string, room: string) {
    const event = new MessageEvent(eventType, {
      data: JSON.stringify(eventData),
    });

    this.eventSubjects.get(room)?.next(event);
  }

  getEventStream(room: string): Observable<MessageEvent> {
    const eventSubject = this.eventSubjects.get(room);

    if (eventSubject) {
      return eventSubject.asObservable();
    }

    return new Observable<MessageEvent>();
  }
}
