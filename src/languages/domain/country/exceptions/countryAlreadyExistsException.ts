import DomainException from '@src/shared/domain/exceptions/domainException';

export default class CountryAlreadyExistsException extends DomainException {
  constructor(countryId: string) {
    super(`Country with id ${countryId} already exists`, 500, 'country_already_exists');
  }
}
