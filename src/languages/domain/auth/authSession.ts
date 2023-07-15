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
    authSession.record(
      new AuthSessionCreatedEvent(
        id.toString(),
        session.name,
        session.email,
        session.token,
        session.provider,
        session.photo
      )
    );

    return authSession;
  }
}
