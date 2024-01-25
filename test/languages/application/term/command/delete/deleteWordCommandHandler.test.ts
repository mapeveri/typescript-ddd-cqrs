import { beforeEach, describe, it } from '@jest/globals';
import DeleteWordCommandHandler from '@src/languages/application/term/command/delete/deleteWordCommandHandler';
import WordMother from '@test/languages/domain/term/word/wordMother';
import { DeleteWordCommandMother } from './deleteWordCommandMother';
import { TermRepositoryMock } from '@test/languages/domain/term/termRepositoryMock';

describe('DeleteWordCommandHandler', () => {
  let termRepository: TermRepositoryMock;
  let deleteWordCommandHandler: DeleteWordCommandHandler;

  beforeEach(() => {
    termRepository = new TermRepositoryMock();

    deleteWordCommandHandler = new DeleteWordCommandHandler(termRepository);
  });

  describe('execute', () => {
    it('should not remove when word id does not exists', async () => {
      const word = WordMother.random();
      const command = DeleteWordCommandMother.random(word.id.value);

      await deleteWordCommandHandler.execute(command);

      termRepository.shouldNotRemove();
    });

    it('should remove a word', async () => {
      const word = WordMother.random();
      const command = DeleteWordCommandMother.random(word.id.value);
      termRepository.add(word);

      await deleteWordCommandHandler.execute(command);

      termRepository.shouldRemove(word);
    });
  });
});
