import ConflictException from '@src/shared/domain/exceptions/conflictException';

export default class CountryAlreadyExistsException extends ConflictException {
  constructor(countryId: string) {
    super(`Country with id ${countryId} already exists`, 'country_already_exists');
  }
}
