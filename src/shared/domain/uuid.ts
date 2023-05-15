import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';

export default class Uuid {
  static next(): string {
    return uuidv4();
  }

  static generateFromString(email: string): string {
    return uuidv5(email, uuidv5.DNS);
  }
}
