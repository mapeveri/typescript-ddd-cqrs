import { Controller, Inject, Param, Sse } from '@nestjs/common';
import { Observable, Subscription } from 'rxjs';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/buses/queryBus/queryBus';
import SearchTermQuery from '@src/languages/application/term/query/search/searchTermQuery';

@Controller('sse')
export class SearchTermsSseController {
  private EVENT_NAME = 'terms';

  constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  @Sse('terms/:userId/:term')
  async sse(@Param('userId') userId: string, @Param('term') term: string): Promise<Observable<MessageEvent>> {
    return new Observable<MessageEvent>((observer) => {
      const subscription = new Subscription();

      const intervalId = setInterval(async () => {
        const data = await this.queryBus.ask(new SearchTermQuery(term));
        const event = new MessageEvent(this.EVENT_NAME, { data: JSON.stringify(data.content) });

        observer.next(event);
      }, 5000);

      subscription.add(() => {
        clearInterval(intervalId);
        subscription.unsubscribe();
      });

      return subscription;
    });
  }
}
