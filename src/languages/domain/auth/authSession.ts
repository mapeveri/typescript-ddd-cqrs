import { AggregateRoot } from '@src/shared/domain/aggregate/aggregateRoot';
import AuthSessionId from './authSessionId';
import AuthSessionCreatedEvent from './authSessionCreatedEvent';
import Session, { SessionPrimitives } from './session';

type AuthSessionPrimitives = {
  id: string;
  session: SessionPrimitives;
  createdAt: Date;
};

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

  toPrimitives(): AuthSessionPrimitives {
    return {
      id: this.id.toString(),
      session: this.session.toPrimitives(),
      createdAt: this.createdAt,
    };
  }
}
