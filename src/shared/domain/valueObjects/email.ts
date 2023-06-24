import InvalidEmailException from '../exceptions/invalidEmailException';
import { ValueObject } from './valueObject';

export default class Email extends ValueObject<string> {
  private emailExpression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  private constructor(value: string) {
    super(value);
  }

  static fromPrimitives(value: string): Email {
    return new this(value);
  }

  static of(value: string): Email {
    const instance = new this(value);
    instance.validateValueIsDefined(value);
    instance.validateEmail(value);
    return instance;
  }

  private validateEmail(email: string): void {
    const isValid: boolean = this.emailExpression.test(email);

    if (false === isValid) {
      throw new InvalidEmailException();
    }
  }
}
