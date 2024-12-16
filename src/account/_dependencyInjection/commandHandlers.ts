import UpdateUserCommandHandler from '@src/account/application/user/command/updateUserCommandHandler';
import SignupUserCommandHandler from '@src/account/application/auth/command/signupUserCommandHandler';

export const commands = [SignupUserCommandHandler, UpdateUserCommandHandler];
