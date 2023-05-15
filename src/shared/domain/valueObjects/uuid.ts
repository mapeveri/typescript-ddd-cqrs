import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import InvalidArgumentException from '../exceptions/invalidArgumentException';
import { ValueObject } from './valueObject';

export class Uuid extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsValidUuid(value);
  }

  static random(): Uuid {
    return new Uuid(uuidv4());
  }

  static generateFromString(value: string): Uuid {
    return new Uuid(uuidv5(value, uuidv5.DNS));
  }

  private ensureIsValidUuid(id: string): void {
    if (!this.validate(id)) {
      throw new InvalidArgumentException(`<${this.constructor.name}> does not allow the value <${id}>`);
    }
  }

  private validate(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }
}
