export type SessionPrimitives = {
  name: string;
  email: string;
  provider: string;
  token: string;
  photo: string;
};

export default class Session {
  private constructor(
    private readonly name: string,
    private readonly email: string,
    private readonly provider: string,
    private readonly token: string,
    private readonly photo: string,
  ) {}

  static of(session: SessionPrimitives): Session {
    return new Session(session.name, session.email, session.provider, session.token, session.photo);
  }

  static fromPrimitives(session: SessionPrimitives): Session {
    return new Session(session.name, session.email, session.provider, session.token, session.photo);
  }

  toPrimitives(): SessionPrimitives {
    return {
      name: this.name,
      email: this.email,
      provider: this.provider,
      token: this.token,
      photo: this.photo,
    };
  }
}
