import { Command } from '@src/shared/domain/buses/commandBus/command';

export default class UpdateUserInterestsCommand implements Command {
  constructor(public readonly userId: string, public readonly interests: string[]) {}
}
