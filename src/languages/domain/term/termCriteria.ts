export default class TermCriteria {
  constructor(
    public readonly term?: string,
    public readonly hashtags?: string[],
    public readonly size?: number,
    public readonly page?: number,
  ) {}

  static from(params: { term?: string; hashtags?: string[]; size?: number; page?: number }) {
    return new TermCriteria(params.term, params.hashtags, params.size, params.page);
  }
}
