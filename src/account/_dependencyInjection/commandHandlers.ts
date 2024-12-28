import UpdateUserCommandHandler from '@src/account/application/user/command/updateUserCommandHandler';
import SignUpUserCommandHandler from '@src/account/application/auth/command/signUpUserCommandHandler';

export const commands = [SignUpUserCommandHandler, UpdateUserCommandHandler];
