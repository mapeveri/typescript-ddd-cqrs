import { IdentityProvider } from '@src/shared/domain/services/identityProvider';
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';

export class UuidIdentityProvider implements IdentityProvider {
  generate(): string {
    return uuidv4();
  }

  generateFromValue(value: string): string {
    return uuidv5(value, uuidv5.DNS);
  }
}
