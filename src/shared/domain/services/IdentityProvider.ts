export interface IdentityProvider {
  generate(): string;

  generateFromValue(value: string): string;
}

export const IDENTITY_PROVIDER = Symbol('IdentityProvider');
