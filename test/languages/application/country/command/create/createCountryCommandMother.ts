import CreateCountryCommand from '@src/languages/application/country/command/create/createCountryCommand';
import faker from 'faker';

interface CreateCountryCommandProps {
  id?: string;
  name?: string;
  iso?: string;
  languages?: Array<{ [key: string]: string }>;
}

export class CreateCountryCommandMother {
  static random(props?: CreateCountryCommandProps): CreateCountryCommand {
    const { id, name, iso, languages } = props ?? {};

    return new CreateCountryCommand(
      id ?? faker.datatype.uuid(),
      name ?? faker.name.findName(),
      iso ?? faker.random.word(),
      languages ?? [{ name: faker.random.word(), language_id: faker.random.word() }]
    );
  }
}
