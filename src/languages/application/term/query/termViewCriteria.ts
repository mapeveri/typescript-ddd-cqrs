import { OrderBy } from '@src/shared/domain/criteria/orderBy';

export type TermCriteriaParams = { size: number; page: number; term?: string; hashtags?: string[]; orderBy?: OrderBy };

export default class TermViewCriteria {
  constructor(
    public readonly size: number,
    public readonly page: number,
    public readonly term?: string,
    public readonly hashtags?: string[],
    public readonly orderBy?: OrderBy,
  ) {}

  static from(params: TermCriteriaParams) {
    return new TermViewCriteria(params.size, params.page, params.term, params.hashtags, params.orderBy);
  }
}
