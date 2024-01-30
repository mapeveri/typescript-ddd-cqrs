import { jest } from '@jest/globals';
import TermView from '@src/languages/domain/term/termView';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import FindSuggestionsTermReadLayer from '@src/languages/application/term/query/suggestion/findSuggestionsTermReadLayer';

export class FindSuggestionsTermReadLayerMock implements FindSuggestionsTermReadLayer {
  private readonly findMock: jest.Mock;
  private terms: TermView[];

  constructor() {
    this.findMock = jest.fn();
    this.terms = [];
  }

  add(term: TermView) {
    this.terms.push(term);
  }

  async find(userId: UserId): Promise<TermView[]> {
    this.findMock(userId);
    return this.terms;
  }
}
