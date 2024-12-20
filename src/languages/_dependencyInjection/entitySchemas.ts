import { CountrySchema } from '@src/languages/infrastructure/persistence/mikroOrm/entities/country';
import { ExpressionSchema } from '@src/languages/infrastructure/persistence/mikroOrm/entities/expression';
import { TermSchema } from '@src/languages/infrastructure/persistence/mikroOrm/entities/term';
import { WordSchema } from '@src/languages/infrastructure/persistence/mikroOrm/entities/word';

export const entitySchemas = [CountrySchema, TermSchema, ExpressionSchema, WordSchema];
