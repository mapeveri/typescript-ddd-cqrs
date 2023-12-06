import { Command } from '@src/shared/domain/buses/commandBus/command';

export default class LoginUserCommand implements Command {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly token: string,
    public readonly provider: string,
    public readonly photo: string,
  ) {}
}
