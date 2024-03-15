import { beforeEach, describe, it } from '@jest/globals';
import DeleteWordCommandHandler from '@src/languages/application/term/command/delete/deleteWordCommandHandler';
import { TermRepositoryMock } from '@test/unit/languages/domain/term/termRepositoryMock';
import WordMother from '@test/unit/languages/domain/term/word/wordMother';
import { DeleteWordCommandMother } from '@test/unit/languages/application/term/command/delete/deleteWordCommandMother';

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
