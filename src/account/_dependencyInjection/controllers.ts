import RefreshTokenPostController from '@src/account/app/controllers/v1/auth/refreshTokenPostController';
import UserPutController from '@src/account/app/controllers/v1/user/userPutController';
import SignupPostController from '@src/account/app/controllers/v1/auth/signupPostController';
import LoginPostController from '@src/account/app/controllers/v1/auth/loginPostController';
import MeGetController from '@src/account/app/controllers/v1/auth/meGetController';
import UserGetController from '@src/account/app/controllers/v1/user/userGetController';

export const controllers = [
  LoginPostController,
  SignupPostController,
  RefreshTokenPostController,
  MeGetController,
  UserGetController,
  UserPutController,
];
