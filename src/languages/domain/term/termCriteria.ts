type Order = { key: string; order: 'desc' | 'asc' };

export default class TermCriteria {
  constructor(
    public readonly size: number,
    public readonly page: number,
    public readonly term?: string,
    public readonly hashtags?: string[],
    public readonly orderBy?: Order,
  ) {}

  static from(params: { size: number; page: number; term?: string; hashtags?: string[]; orderBy?: Order }) {
    return new TermCriteria(params.size, params.page, params.term, params.hashtags, params.orderBy);
  }
}
