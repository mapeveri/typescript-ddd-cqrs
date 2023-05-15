import Email from '../../../shared/domain/valueObjects/email';
import { AggregateRoot } from '../../../shared/domain/aggregate/aggregateRoot';
import Expression from '../expression/expression';
import Word from '../word/word';
import Uuid from '../../../shared/domain/uuid';

export default class User extends AggregateRoot {
  id: string;
  name: string;
  provider: string;
  email: Email;
  photo: string;
  words: Word[];
  expressions: Expression[];

  constructor(
    id: string,
    name: string,
    provider: string,
    email: Email,
    photo: string,
    words: Word[],
    expressions: Expression[]
  ) {
    super();

    this.id = id;
    this.name = name;
    this.provider = provider;
    this.email = email;
    this.photo = photo;
    this.words = words;
    this.expressions = expressions;
  }

  static create(id: string, name: string, provider: string, email: Email, photo: string): User {
    return new this(id, name, provider, email, photo, [], []);
  }

  update(name: string, photo: string): void {
    this.name = name;
    this.photo = photo;
  }

  toObject(): object {
    return {
      id: this.id,
      name: this.name,
      provider: this.provider,
      email: this.email.toString(),
      photo: this.photo,
      expressions: this.expressions,
      words: this.words,
    };
  }

  static validateId(id: string, email: string): boolean {
    const userEmailId = Uuid.generateFromString(email);
    if (userEmailId !== id) {
      return false;
    }

    return true;
  }
}
