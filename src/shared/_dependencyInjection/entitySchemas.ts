import { AuthSessionSchema } from '@src/languages/infrastructure/persistence/mikroOrm/entities/authSession';
import { CountrySchema } from '@src/languages/infrastructure/persistence/mikroOrm/entities/country';
import { ExpressionSchema } from '@src/languages/infrastructure/persistence/mikroOrm/entities/expression';
import { UserSchema } from '@src/languages/infrastructure/persistence/mikroOrm/entities/user';
import { WordSchema } from '@src/languages/infrastructure/persistence/mikroOrm/entities/word';

export const entitySchemas = [UserSchema, CountrySchema, AuthSessionSchema, ExpressionSchema, WordSchema];
