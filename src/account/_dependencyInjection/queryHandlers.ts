import FindUserQueryHandler from '@src/account/application/user/query/findUserQueryHandler';
import GetUserSocialLoginQueryHandler from '@src/account/application/auth/query/getUserSocialLoginQueryHandler';

export const queries = [GetUserSocialLoginQueryHandler, FindUserQueryHandler];
