import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import CreateWordCommandHandler from '@src/languages/application/term/command/create/createWordCommandHandler';
import { EventBusMock } from '@test/shared/domain/buses/eventBus/eventBusMock';
import { WordRepositoryMock } from '@test/languages/domain/word/wordRepositoryMock';
import { CreateWordCommandMother } from './createWordCommandMother';
import WordMother from '@test/languages/domain/word/wordMother';
import Word from '@src/languages/domain/term/word/word';
import { WordCreatedEventMother } from '@test/languages/domain/word/domainEvents/wordCreatedEventMother';
import { UserIdMother } from '@test/languages/domain/user/valueObjects/userIdMother';
import WordAlreadyExistsException from '@src/languages/domain/term/word/exceptions/wordAlreadyExistsException';

describe('CreateWordCommandHandler', () => {
  let eventBus: EventBusMock;
  let wordRepository: WordRepositoryMock;
  let createWordCommandHandler: CreateWordCommandHandler;

  beforeEach(() => {
    eventBus = new EventBusMock();
    wordRepository = new WordRepositoryMock();

    createWordCommandHandler = new CreateWordCommandHandler(wordRepository, eventBus);

    jest.useFakeTimers();
  });

  describe('execute', () => {
    it('should raise an exception when word id already exists', async () => {
      const word = WordMother.random();
      const command = CreateWordCommandMother.random({ id: word.id.value });
      wordRepository.add(word);

      await expect(createWordCommandHandler.execute(command)).rejects.toThrowError(WordAlreadyExistsException);

      wordRepository.shouldNotStore();
    });

    it('should create a word', async () => {
      const command = CreateWordCommandMother.random();
      const userId = UserIdMother.random(command.userId);
      const word: Word = WordMother.createFromCreateWordCommand(command, userId);
      const wordCreatedEvent = WordCreatedEventMother.createFromCreateWordCommand(command);

      await createWordCommandHandler.execute(command);

      wordRepository.shouldStore(word);
      eventBus.shouldPublish([wordCreatedEvent]);
    });
  });
});
