export default class TermCriteria {
  constructor(public readonly term?: string, public readonly hashtags?: string[], public readonly limit?: number) {}

  static from(params: { term?: string; hashtags?: string[]; limit?: number }) {
    return new TermCriteria(params.term, params.hashtags, params.limit);
  }
}
