import { jest } from '@jest/globals';
import Term from '@src/languages/domain/term/term';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import FindSuggestionsTermReadLayer from '@src/languages/application/term/query/suggestion/findSuggestionsTermReadLayer';

export class FindSuggestionsTermReadLayerMock implements FindSuggestionsTermReadLayer {
  private readonly findMock: jest.Mock;
  private terms: Term[];

  constructor() {
    this.findMock = jest.fn();
    this.terms = [];
  }

  add(term: Term) {
    this.terms.push(term);
  }

  async find(userId: UserId): Promise<Term[]> {
    this.findMock(userId);
    return this.terms;
  }
}
