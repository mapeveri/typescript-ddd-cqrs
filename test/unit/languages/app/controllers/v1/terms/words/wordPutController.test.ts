import { beforeAll, describe, expect, it, jest } from '@jest/globals';
import WordPutController from '@src/languages/app/controllers/v1/terms/words/wordPutController';
import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';
import { CommandBus } from '@src/shared/domain/bus/commandBus/commandBus';
import { UpdateWordCommandMother } from '@test/unit/languages/application/term/command/word/updateWordCommandMother';
import { Request } from 'express';

describe('Given a WordPutController to handle', () => {
  let sut: WordPutController;
  let commandBusMock: CommandBus;

  const prepareDependencies = () => {
    commandBusMock = {
      dispatch: jest.fn(),
    } as CommandBus;
  };

  const initHandler = () => {
    sut = new WordPutController(commandBusMock);

    jest.useFakeTimers();
  };

  beforeAll(() => {
    prepareDependencies();
    initHandler();
  });

  describe('When received a request', () => {
    const wordId: string = TermIdMother.random().toString();

    it('should update a word', async () => {
      const userId = 'ac7f642c-f13d-4cc4-a49d-39af6af6522c';
      const countryId = 'ec7f642c-f13d-4cc4-a49d-39af6af6527d';
      const languageId = 'EN';
      const terms = [{ word: 'wordTest', example: 'exampleTest', description: 'descriptionTest', hashtags: ['test'] }];

      const request = { user: { id: userId } } as unknown as Request;

      await sut.run(wordId, request, { languageId, countryId, terms });

      expect(commandBusMock.dispatch).toHaveBeenCalledWith(
        UpdateWordCommandMother.random({ id: wordId, userId, countryId, languageId, terms }),
      );
      expect(commandBusMock.dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
