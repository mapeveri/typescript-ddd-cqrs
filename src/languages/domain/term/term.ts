import TermType from './valueObjects/termType';

export default class Term {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly example: string,
    readonly type: TermType,
    readonly hashtags: Array<string>,
    readonly likes: Array<string>,
    readonly disLikes: Array<string>,
    readonly favourites: Array<string>
  ) {}

  static create(
    id: string,
    title: string,
    description: string,
    example: string,
    type: TermType,
    hashtags: Array<string>,
    likes: Array<string>,
    disLikes: Array<string>,
    favourites: Array<string>
  ): Term {
    return new this(id, title, description, example, type, hashtags, likes, disLikes, favourites);
  }

  toPrimitives(): object {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      example: this.example,
      type: this.type.type,
      hashtags: this.hashtags,
      likes: this.likes,
      disLikes: this.disLikes,
      favourites: this.favourites,
    };
  }
}
