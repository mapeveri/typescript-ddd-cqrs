import { USER_REPOSITORY } from '@src/account/domain/user/userRepository';

import MikroOrmUserRepository from '@src/account/infrastructure/persistence/mikroOrm/repositories/mikroOrmUserRepository';

export const repositories = [
  {
    provide: USER_REPOSITORY,
    useClass: MikroOrmUserRepository,
  },
];
