export const WORD = 'word';
export const EXPRESSION = 'expression';

export default class Term {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly example: string,
    readonly type: string,
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
    type: string,
    hashtags: Array<string>,
    likes: Array<string>,
    disLikes: Array<string>,
    favourites: Array<string>
  ): Term {
    return new this(id, title, description, example, type, hashtags, likes, disLikes, favourites);
  }

  toObject(): object {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      example: this.example,
      type: this.type,
      hashtags: this.hashtags,
      likes: this.likes,
      disLikes: this.disLikes,
      favourites: this.favourites,
    };
  }
}
