import { v4 as uuidv4 } from 'uuid';

export default class Uuid {
  static next(): string {
    return uuidv4();
  }
}
