import TermType from '../../../domain/term/termType';

export default class TermView {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly example: string,
    readonly type: TermType,
    readonly hashtags: Array<string>,
    readonly totalLikes: number,
    readonly createdAt: Date,
  ) {}

  static create(
    id: string,
    title: string,
    description: string,
    example: string,
    type: TermType,
    hashtags: Array<string>,
    totalLikes: number,
    createdAt: Date,
  ): TermView {
    return new this(id, title, description, example, type, hashtags, totalLikes, createdAt);
  }

  toPrimitives(): object {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      example: this.example,
      type: this.type.value,
      hashtags: this.hashtags,
      totalLikes: this.totalLikes,
      createdAt: this.createdAt.toISOString(),
    };
  }
}
