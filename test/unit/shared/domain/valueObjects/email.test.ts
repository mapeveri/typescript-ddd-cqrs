import { describe, expect, it } from 'vitest';
import InvalidEmailException from '@src/shared/domain/exceptions/invalidEmailException';
import Email from '@src/shared/domain/valueObjects/email';

describe('Email', () => {
  it('should check a valid email and set the value', async () => {
    const validEmail = 'test@test.com';
    const email = Email.of(validEmail);

    expect(email.toString()).toEqual(validEmail);
  });

  it('should raise an exception when the email is invalid', async () => {
    const invalidEmail = 'test';

    expect(() => {
      Email.of(invalidEmail);
    }).toThrow(InvalidEmailException);
  });
});
