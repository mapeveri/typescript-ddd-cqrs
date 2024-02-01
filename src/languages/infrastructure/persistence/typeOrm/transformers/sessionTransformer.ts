import Session from '@src/languages/domain/auth/session';
import { ValueTransformer } from 'typeorm';

export default class SessionTransformer implements ValueTransformer {
  to(value: Session): string {
    return JSON.stringify(value);
  }

  from(value: string): Session {
    const parsedValue = JSON.parse(value);
    return Session.fromPrimitives(parsedValue);
  }
}
