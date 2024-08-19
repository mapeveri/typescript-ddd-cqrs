import { AuthSessionSchema } from '@src/languages/infrastructure/persistence/mikroOrm/entities/authSession';
import { CountrySchema } from '@src/languages/infrastructure/persistence/mikroOrm/entities/country';
import { UserSchema } from '@src/languages/infrastructure/persistence/mikroOrm/entities/user';

export const entitySchemas = [UserSchema, CountrySchema, AuthSessionSchema];
