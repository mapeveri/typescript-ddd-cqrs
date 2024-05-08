import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import CreateWordCommandHandler from '@src/languages/application/term/command/word/createWordCommandHandler';
import { TermRepositoryMock } from '@test/unit/languages/domain/term/termRepositoryMock';
import { EventBusMock } from '@test/unit/shared/domain/buses/eventBus/eventBusMock';
import WordMother from '@test/unit/languages/domain/term/word/wordMother';
import { CreateWordCommandMother } from '@test/unit/languages/application/term/command/word/createWordCommandMother';
import WordAlreadyExistsException from '@src/languages/domain/term/word/wordAlreadyExistsException';
import { UserIdMother } from '@test/unit/languages/domain/user/userIdMother';
import Word from '@src/languages/domain/term/word/word';
import { WordCreatedEventMother } from '@test/unit/languages/domain/term/word/wordCreatedEventMother';

describe('CreateWordCommandHandler', () => {
  let eventBus: EventBusMock;
  let termRepository: TermRepositoryMock;
  let createWordCommandHandler: CreateWordCommandHandler;

  beforeEach(() => {
    eventBus = new EventBusMock();
    termRepository = new TermRepositoryMock();

    createWordCommandHandler = new CreateWordCommandHandler(termRepository, eventBus);

    jest.useFakeTimers();
  });

  describe('execute', () => {
    it('should raise an exception when word id already exists', async () => {
      const word = WordMother.random();
      const command = CreateWordCommandMother.random({ id: word.id.value });
      termRepository.add(word);

      await expect(createWordCommandHandler.execute(command)).rejects.toThrowError(WordAlreadyExistsException);

      termRepository.shouldNotStore();
    });

    it('should create a word', async () => {
      const command = CreateWordCommandMother.random();
      const userId = UserIdMother.random(command.userId);
      const word: Word = WordMother.createFromCreateWordCommand(command, userId);
      const wordCreatedEvent = WordCreatedEventMother.createFromCreateWordCommand(command);

      await createWordCommandHandler.execute(command);

      termRepository.shouldStore(word);
      eventBus.shouldPublish([wordCreatedEvent]);
    });
  });
});
