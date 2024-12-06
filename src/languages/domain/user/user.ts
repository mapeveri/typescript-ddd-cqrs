import { AggregateRoot } from '@src/shared/domain/aggregate/aggregateRoot';
import UserId from './userId';
import Email from '@src/shared/domain/valueObjects/email';
import UserUpdatedEvent from '@src/languages/domain/user/userUpdatedEvent';
import UserCreatedEvent from '@src/languages/domain/user/userCreatedEvent';

export type UserPrimitives = {
  id: string;
  name: string;
  provider: string;
  email: string;
  photo: string;
  interests: string[];
};

export default class User extends AggregateRoot {
  constructor(
    private id: UserId,
    private name: string,
    private provider: string,
    private email: Email,
    private photo: string,
    private interests: string[],
  ) {
    super();
  }

  public getName(): string {
    return this.name;
  }

  public getPhoto(): string {
    return this.photo;
  }

  public getInterests(): string[] {
    return this.interests;
  }

  static create(id: UserId, name: string, provider: string, email: Email, photo: string): User {
    const user = new this(id, name, provider, email, photo, []);

    user.record(new UserCreatedEvent(id.toString(), name, provider, email.toString(), photo));

    return user;
  }

  update(name: string, photo: string, interests: string[]): void {
    this.name = name;
    this.photo = photo;
    this.interests = interests;

    this.record(new UserUpdatedEvent(this.id.value, this.name, this.photo, this.interests));
  }

  toPrimitives(): UserPrimitives {
    return {
      id: this.id.toString(),
      name: this.name,
      provider: this.provider,
      email: this.email.toString(),
      photo: this.photo,
      interests: this.interests,
    };
  }
}
