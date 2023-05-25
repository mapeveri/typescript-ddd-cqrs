import { Command } from '@src/shared/domain/buses/commandBus/command';

export default class UpdateUserCommand implements Command {
  constructor(public readonly id: string, public readonly name: string, public readonly photo: string) {}
}
