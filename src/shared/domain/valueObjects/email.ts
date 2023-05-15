import InvalidEmailException from '../exceptions/invalidEmailException';
import { ValueObject } from './valueObject';

export default class Email extends ValueObject<string> {
  private emailExpression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  constructor(value: string) {
    super(value);
    this.validateEmail(value);
  }

  private validateEmail(email: string): void {
    const isValid: boolean = this.emailExpression.test(email);

    if (false === isValid) {
      throw new InvalidEmailException();
    }
  }
}
