import { describe, expect, it } from '@jest/globals';
import InvalidEmailException from '@src/shared/domain/exceptions/invalidEmailException';
import Email from '@src/shared/domain/valueObjects/email';

describe('Email.test check', () => {
  it('should check a valid email and set the value', async () => {
    const validEmail = 'test@test.com';
    const email = new Email(validEmail);

    expect(email.toString()).toEqual(validEmail);
  });

  it('should raise an exception when the email is invalid', async () => {
    const invalidEmail = 'test';

    expect(() => {
      new Email(invalidEmail);
    }).toThrow(InvalidEmailException);
  });
});
