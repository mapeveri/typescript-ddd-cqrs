import { Command } from '../../../../../shared/domain/buses/commandBus/command';

export default class CreateCountryCommand implements Command {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly iso: string,
    public readonly languages: Array<{ [key: string]: string }>
  ) {}
}
