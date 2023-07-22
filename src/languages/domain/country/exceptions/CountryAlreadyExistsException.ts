import DomainException from '@src/shared/domain/exceptions/domainException';

export default class CountryAlreadyExistsException extends DomainException {
  constructor(public message: string = '', public code: string = 'country_already_exists') {
    super(message, 500, code);
  }
}
