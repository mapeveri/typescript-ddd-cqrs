export default class TermCriteria {
  constructor(
    public readonly size: number,
    public readonly page: number,
    public readonly term?: string,
    public readonly hashtags?: string[],
  ) {}

  static from(params: { size: number; page: number; term?: string; hashtags?: string[] }) {
    return new TermCriteria(params.size, params.page, params.term, params.hashtags);
  }
}
