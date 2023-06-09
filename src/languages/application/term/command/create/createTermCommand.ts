import { Command } from '@src/shared/domain/buses/commandBus/command';

export default class CreateTermCommand implements Command {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly example: string,
    public readonly hashtags: Array<string>,
    public readonly type: string
  ) {}
}
