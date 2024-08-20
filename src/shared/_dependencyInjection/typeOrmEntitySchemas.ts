import { ExpressionSchema } from '@src/languages/infrastructure/persistence/typeOrm/entities/expression';
import { TermSchema } from '@src/languages/infrastructure/persistence/typeOrm/entities/term';
import { WordSchema } from '@src/languages/infrastructure/persistence/typeOrm/entities/word';

export const typeOrmEntitySchemas = [TermSchema, ExpressionSchema, WordSchema];
