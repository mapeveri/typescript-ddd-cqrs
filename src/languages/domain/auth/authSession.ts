import { AggregateRoot } from '@src/shared/domain/aggregate/aggregateRoot';
import AuthSessionId from './valueObjects/authSessionId';
import AuthSessionCreatedEvent from './domainEvents/authSessionCreatedEvent';
import Session from './valueObjects/session';

export default class AuthSession extends AggregateRoot {
  id: AuthSessionId;
  session: Session;
  createdAt: Date;

  constructor(id: AuthSessionId, session: Session, createdAt: Date) {
    super();
    this.id = id;
    this.session = session;
    this.createdAt = createdAt;
  }

  static create(id: AuthSessionId, session: Session): AuthSession {
    const authSession = new this(id, session, new Date());
    const sessionPrimitives = session.toPrimitives();

    authSession.record(
      new AuthSessionCreatedEvent(
        id.toString(),
        sessionPrimitives.name,
        sessionPrimitives.email,
        sessionPrimitives.token,
        sessionPrimitives.provider,
        sessionPrimitives.photo,
      ),
    );

    return authSession;
  }
}
