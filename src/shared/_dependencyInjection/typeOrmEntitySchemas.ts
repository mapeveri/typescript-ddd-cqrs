import { AuthSessionSchema } from '@src/languages/infrastructure/persistence/typeOrm/entities/authSession';
import { CountrySchema } from '@src/languages/infrastructure/persistence/typeOrm/entities/country';
import { ExpressionSchema } from '@src/languages/infrastructure/persistence/typeOrm/entities/expression';
import { TermSchema } from '@src/languages/infrastructure/persistence/typeOrm/entities/term';
import { WordSchema } from '@src/languages/infrastructure/persistence/typeOrm/entities/word';

export const typeOrmEntitySchemas = [AuthSessionSchema, CountrySchema, TermSchema, ExpressionSchema, WordSchema];
