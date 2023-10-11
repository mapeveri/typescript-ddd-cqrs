import { beforeEach, describe, it } from '@jest/globals';
import DeleteWordCommandHandler from '@src/languages/application/word/command/delete/deleteWordCommandHandler';
import { WordRepositoryMock } from '@test/languages/domain/word/wordRepositoryMock';
import WordMother from '@test/languages/domain/word/wordMother';
import { DeleteWordCommandMother } from './deleteWordCommandMother';

describe('DeleteWordCommandHandler', () => {
  let wordRepository: WordRepositoryMock;
  let deleteWordCommandHandler: DeleteWordCommandHandler;

  beforeEach(() => {
    wordRepository = new WordRepositoryMock();

    deleteWordCommandHandler = new DeleteWordCommandHandler(wordRepository);
  });

  describe('execute', () => {
    it('should not remove when word id does not exists', async () => {
      const word = WordMother.random();
      const command = DeleteWordCommandMother.random(word.id.value);
      wordRepository.findById.mockResolvedValueOnce(null);

      await deleteWordCommandHandler.execute(command);

      wordRepository.expectDeleteNotCalled();
    });

    it('should remove a word', async () => {
      const word = WordMother.random();
      const command = DeleteWordCommandMother.random(word.id.value);
      wordRepository.findById.mockResolvedValueOnce(word);

      await deleteWordCommandHandler.execute(command);

      wordRepository.expectDeleteCalledWith(word);
    });
  });
});
