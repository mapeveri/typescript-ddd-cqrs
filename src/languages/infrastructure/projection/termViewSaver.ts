import { TermView } from '@src/languages/application/term/view/termView';

interface TermViewSaver {
  save(term: TermView): Promise<void>;
}

export default TermViewSaver;

export const TERM_VIEW_SAVER = Symbol('TermViewSaver');
