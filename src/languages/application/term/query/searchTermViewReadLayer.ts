import { TermView } from '@src/languages/application/term/query/view/termView';
import { OrderBy } from '@src/shared/domain/criteria/orderBy';

export type TermCriteriaParams = { size: number; page: number; term?: string; hashtags?: string[]; orderBy?: OrderBy };

interface SearchTermViewReadLayer {
  search(criteria: TermCriteriaParams): Promise<TermView[]>;
}

export default SearchTermViewReadLayer;

export const SEARCH_TERM_VIEW_READ_LAYER = Symbol('SearchTermViewReadLayer');
