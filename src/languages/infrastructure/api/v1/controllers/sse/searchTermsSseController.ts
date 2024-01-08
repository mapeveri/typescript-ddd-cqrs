import { Controller, DefaultValuePipe, Inject, Param, ParseIntPipe, Query, Sse } from '@nestjs/common';
import { Observable, Subscription } from 'rxjs';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/bus/queryBus/queryBus';
import SearchTermQuery from '@src/languages/application/term/query/search/searchTermQuery';

@Controller('sse')
export class SearchTermsSseController {
  private EVENT_NAME = 'terms';

  constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  @Sse('terms/:userId/:term')
  async sse(
    @Param('userId') userId: string,
    @Param('term') term: string,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<Observable<MessageEvent>> {
    return new Observable<MessageEvent>((observer) => {
      const subscription = new Subscription();

      const intervalId = setInterval(async () => {
        const data = await this.queryBus.ask(new SearchTermQuery(term, size, page));
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
