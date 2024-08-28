import { AggregateRoot } from '@src/shared/domain/aggregate/aggregateRoot';
import AuthSessionId from './authSessionId';
import AuthSessionCreatedEvent from './authSessionCreatedEvent';

type Session = {
  name: string;
  email: string;
  provider: string;
  token: string;
  photo: string;
};

type AuthSessionPrimitives = {
  id: string;
  session: Session;
  createdAt: string;
};

export default class AuthSession extends AggregateRoot {
  constructor(private id: AuthSessionId, private session: Session, private createdAt: Date) {
    super();
  }

  static create(
    id: AuthSessionId,
    name: string,
    email: string,
    provider: string,
    token: string,
    photo: string,
  ): AuthSession {
    const authSession = new this(id, { name, email, provider, token, photo }, new Date());

    authSession.record(new AuthSessionCreatedEvent(id.toString(), name, email, token, provider, photo));

    return authSession;
  }

  toPrimitives(): AuthSessionPrimitives {
    return {
      id: this.id.toString(),
      session: this.session,
      createdAt: this.createdAt.toISOString(),
    };
  }
}
