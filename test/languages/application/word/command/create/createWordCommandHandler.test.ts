import { beforeEach, describe, expect, it } from '@jest/globals';
import CreateWordCommandHandler from '@src/languages/application/word/command/create/createWordCommandHandler';
import { EventBusMock } from '@test/shared/domain/buses/eventBus/eventBusMock';
import { WordRepositoryMock } from '@test/languages/domain/word/wordRepositoryMock';
import { CreateWordCommandMother } from './createWordCommandMother';
import WordMother from '@test/languages/domain/word/wordMother';
import Word from '@src/languages/domain/word/word';
import { WordCreatedEventMother } from '@test/languages/domain/word/domainEvents/wordCreatedEventMother';
import { UserIdMother } from '@test/languages/domain/user/valueObjects/userIdMother';
import WordAlreadyExistsException from '@src/languages/domain/word/exceptions/WordAlreadyExistsException';

describe('CreateWordCommandHandler', () => {
  let eventBus: EventBusMock;
  let wordRepository: WordRepositoryMock;
  let createWordCommandHandler: CreateWordCommandHandler;

  beforeEach(() => {
    eventBus = new EventBusMock();
    wordRepository = new WordRepositoryMock();

    createWordCommandHandler = new CreateWordCommandHandler(wordRepository, eventBus);
  });

  describe('execute', () => {
    it('should raise an exception when word id already exists', async () => {
      const word = WordMother.random();
      const command = CreateWordCommandMother.random({ id: word.id.value });
      wordRepository.returnOnFindById(word);

      await expect(createWordCommandHandler.execute(command)).rejects.toThrowError(WordAlreadyExistsException);

      wordRepository.expectSaveNotCalled();
    });

    it('should create a word', async () => {
      const command = CreateWordCommandMother.random();
      const userId = UserIdMother.random(command.userId);
      const word: Word = WordMother.createFromCreateWordCommand(command, userId);
      const wordCreatedEvent = WordCreatedEventMother.createFromCreateWordCommand(command);
      wordRepository.returnOnFindById(null);

      await createWordCommandHandler.execute(command);

      wordRepository.expectSaveCalledWith(word);
      eventBus.expectPublishCalledWith([wordCreatedEvent]);
    });
  });
});
