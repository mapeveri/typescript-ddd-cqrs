import { Controller, Inject, Param, Query, Sse } from '@nestjs/common';
import { Observable, Subscription } from 'rxjs';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/bus/queryBus/queryBus';
import SearchTermQuery from '@src/languages/application/term/query/searchTermQuery';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SearchTermsQueryParamsDto } from '@src/languages/app/controllers/v1/terms/searchTermsQueryParamsDto';
import { TermViewsResponse } from '@src/languages/app/controllers/v1/terms/termViewsResponse';

@ApiTags('Terms')
@Controller('sse')
export class SearchTermsSseController {
  private EVENT_NAME = 'terms';

  constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  @Sse('terms/:userId/:term')
  @ApiOkResponse({ type: TermViewsResponse })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  async sse(
    @Param('userId') userId: string,
    @Param('term') term: string,
    @Query() queryParams: SearchTermsQueryParamsDto,
  ): Promise<Observable<MessageEvent>> {
    return new Observable<MessageEvent>((observer) => {
      const subscription = new Subscription();

      const intervalId = setInterval(async () => {
        const data = await this.queryBus.ask(
          new SearchTermQuery(
            term,
            Number(queryParams.size),
            Number(queryParams.page),
            queryParams.orderBy,
            queryParams.orderType,
          ),
        );
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
