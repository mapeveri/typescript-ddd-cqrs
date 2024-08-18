import { AuthSessionSchema } from '@src/languages/infrastructure/persistence/typeOrm/entities/authSession';
import { ExpressionSchema } from '@src/languages/infrastructure/persistence/typeOrm/entities/expression';
import { TermSchema } from '@src/languages/infrastructure/persistence/typeOrm/entities/term';
import { WordSchema } from '@src/languages/infrastructure/persistence/typeOrm/entities/word';

export const typeOrmEntitySchemas = [AuthSessionSchema, TermSchema, ExpressionSchema, WordSchema];
