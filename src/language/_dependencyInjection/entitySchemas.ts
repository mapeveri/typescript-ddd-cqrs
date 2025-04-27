import { CountrySchema } from '@src/language/infrastructure/persistence/mikroOrm/entities/country';
import { ExpressionSchema } from '@src/language/infrastructure/persistence/mikroOrm/entities/expression';
import { TermSchema } from '@src/language/infrastructure/persistence/mikroOrm/entities/term';
import { WordSchema } from '@src/language/infrastructure/persistence/mikroOrm/entities/word';

export const entitySchemas = [CountrySchema, TermSchema, ExpressionSchema, WordSchema];
