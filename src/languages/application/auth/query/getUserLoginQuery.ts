import { Query } from '@src/shared/domain/bus/queryBus/query';

export default class GetUserLoginQuery implements Query {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly token: string,
    public readonly provider: string,
    public readonly photo: string,
  ) {}
}
