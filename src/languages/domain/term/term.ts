import TermType from './valueObjects/termType';
import EntityProjection from '@src/shared/domain/projection/entityProjection';

export default class Term extends EntityProjection {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly example: string,
    readonly type: TermType,
    readonly hashtags: Array<string>,
    readonly totalLikes: number,
  ) {
    super();
  }

  static create(
    id: string,
    title: string,
    description: string,
    example: string,
    type: TermType,
    hashtags: Array<string>,
    totalLikes: number,
  ): Term {
    return new this(id, title, description, example, type, hashtags, totalLikes);
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
    };
  }
}
