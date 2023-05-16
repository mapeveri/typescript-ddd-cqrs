import Email from '../../../shared/domain/valueObjects/email';
import { AggregateRoot } from '../../../shared/domain/aggregate/aggregateRoot';
import UserId from './valueObjects/userId';

export default class User extends AggregateRoot {
  id: UserId;
  name: string;
  provider: string;
  email: Email;
  photo: string;

  constructor(id: UserId, name: string, provider: string, email: Email, photo: string) {
    super();

    this.id = id;
    this.name = name;
    this.provider = provider;
    this.email = email;
    this.photo = photo;
  }

  static create(id: UserId, name: string, provider: string, email: Email, photo: string): User {
    return new this(id, name, provider, email, photo);
  }

  update(name: string, photo: string): void {
    this.name = name;
    this.photo = photo;
  }

  toObject(): object {
    return {
      id: this.id.toString(),
      name: this.name,
      provider: this.provider,
      email: this.email.toString(),
      photo: this.photo,
    };
  }
}
