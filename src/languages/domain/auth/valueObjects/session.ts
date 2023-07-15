export type SessionPrimitives = {
  name: string;
  email: string;
  provider: string;
  token: string;
  photo: string;
};

export default class Session {
  name: string;
  email: string;
  provider: string;
  token: string;
  photo: string;

  private constructor(name: string, email: string, provider: string, token: string, photo: string) {
    this.name = name;
    this.email = email;
    this.provider = provider;
    this.token = token;
    this.photo = photo;
  }

  static of(session: SessionPrimitives): Session {
    return new Session(session.name, session.email, session.provider, session.token, session.photo);
  }

  static fromPrimitives(session: SessionPrimitives): Session {
    return new Session(session.name, session.email, session.provider, session.token, session.photo);
  }

  toObject(): SessionPrimitives {
    return {
      name: this.name,
      email: this.email,
      provider: this.provider,
      token: this.token,
      photo: this.photo,
    };
  }
}
