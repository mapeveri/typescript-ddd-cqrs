import TermView from '@src/languages/application/term/viewModel/termView';

interface TermViewSaver {
  save(term: TermView): Promise<void>;
}

export default TermViewSaver;

export const TERM_VIEW_SAVER = Symbol('TermViewSaver');
