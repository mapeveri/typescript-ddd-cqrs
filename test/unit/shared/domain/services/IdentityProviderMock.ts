import { IdentityProvider } from '@src/shared/domain/services/IdentityProvider';

export class IdentityProviderMock implements IdentityProvider {
  private value: string;

  add(value: string): void {
    this.value = value;
  }

  clean(): void {
    this.value = '';
  }

  generate(): string {
    return this.value;
  }

  generateFromValue(_value: string): string {
    return this.value;
  }
}
