import { TermView } from '@src/languages/application/term/query/termView';
import { OrderBy } from '@src/shared/domain/criteria/orderBy';

export type TermCriteriaParams = { size: number; page: number; term?: string; hashtags?: string[]; orderBy?: OrderBy };

interface SearchTermViewReadModel {
  search(criteria: TermCriteriaParams): Promise<TermView[]>;
}

export default SearchTermViewReadModel;

export const SEARCH_TERM_VIEW_READ_MODEL = Symbol('SearchTermViewReadModel');
