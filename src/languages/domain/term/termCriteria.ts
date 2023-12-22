export default class TermCriteria {
  constructor(public readonly term?: string, public readonly hashtags?: string[]) {}

  static from(params: { term?: string; hashtags?: string[] }) {
    return new TermCriteria(params.term, params.hashtags);
  }
}
