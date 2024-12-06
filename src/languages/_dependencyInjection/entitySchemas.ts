import { CountrySchema } from '@src/languages/infrastructure/persistence/mikroOrm/entities/country';
import { ExpressionSchema } from '@src/languages/infrastructure/persistence/mikroOrm/entities/expression';
import { TermSchema } from '@src/languages/infrastructure/persistence/mikroOrm/entities/term';
import { UserSchema } from '@src/languages/infrastructure/persistence/mikroOrm/entities/user';
import { WordSchema } from '@src/languages/infrastructure/persistence/mikroOrm/entities/word';

export const entitySchemas = [UserSchema, CountrySchema, TermSchema, ExpressionSchema, WordSchema];
