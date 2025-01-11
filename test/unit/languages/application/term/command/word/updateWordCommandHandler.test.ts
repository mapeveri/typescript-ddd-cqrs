import { beforeEach, beforeAll, describe, expect, it, jest } from '@jest/globals';
import InvalidArgumentException from '@src/shared/domain/exceptions/invalidArgumentException';
import UpdateWordCommandHandler from '@src/languages/application/term/command/word/updateWordCommandHandler';
import { UpdateWordCommandMother } from '@test/unit/languages/application/term/command/word/updateWordCommandMother';
import UpdateWordCommand from '@src/languages/application/term/command/word/updateWordCommand';
import TermDoesNotExistsException from '@src/languages/domain/term/termDoesNotExistsException';
import { TermRepositoryMock } from '@test/unit/languages/domain/term/termRepositoryMock';
import WordMother from '@test/unit/languages/domain/term/word/wordMother';
import { UserIdMother } from '@test/unit/account/domain/user/userIdMother';
import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';
import TermDoesNotBelongToUserException from '@src/languages/domain/term/termDoesNotBelongToUserException';
import Word from '@src/languages/domain/term/word/word';
import WordTermCollectionMother from '@test/unit/languages/domain/term/word/wordTermCollectionMother';
import { CountryIdMother } from '@test/unit/languages/domain/country/countryIdMother';
import { EventBusMock } from '@test/unit/shared/domain/buses/eventBus/eventBusMock';
import { WordUpdatedEventMother } from '@test/unit/languages/domain/term/word/wordUpdatedEventMother';

describe('Given a UpdateWordCommandHandler to handle', () => {
  let eventBus: EventBusMock;
  let termRepository: TermRepositoryMock;
  let handler: UpdateWordCommandHandler;

  const prepareDependencies = () => {
    eventBus = new EventBusMock();
    termRepository = new TermRepositoryMock();
  };

  const initHandler = () => {
    handler = new UpdateWordCommandHandler(termRepository, eventBus);

    jest.useFakeTimers();
  };

  const clean = () => {
    termRepository.clean();
    eventBus.clean();
  };

  beforeAll(() => {
    prepareDependencies();
    initHandler();
  });

  beforeEach(() => {
    clean();
  });

  describe('When term id is invalid', () => {
    let command: UpdateWordCommand;

    function startScenario() {
      command = UpdateWordCommandMother.random({ id: '' });
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(InvalidArgumentException);
    });

    it('then should not add the word', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(termRepository.storedChanged()).toBeFalsy();
      expect(termRepository.stored()).toHaveLength(0);
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(eventBus.domainEvents()).toHaveLength(0);
    });
  });

  describe('When the term does not exists', () => {
    let command: UpdateWordCommand;

    function startScenario() {
      command = UpdateWordCommandMother.random();
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(TermDoesNotExistsException);
    });

    it('then should not add the word', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(termRepository.storedChanged()).toBeFalsy();
      expect(termRepository.stored()).toHaveLength(0);
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(eventBus.domainEvents()).toHaveLength(0);
    });
  });

  describe('When user id is invalid', () => {
    let command: UpdateWordCommand;

    function startScenario() {
      command = UpdateWordCommandMother.random({ userId: '' });

      const word = WordMother.random({
        id: TermIdMother.random(command.id),
      });
      termRepository.add(word);
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(InvalidArgumentException);
    });

    it('then should not add the word', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(termRepository.storedChanged()).toBeFalsy();
      expect(termRepository.stored()).toHaveLength(0);
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(eventBus.domainEvents()).toHaveLength(0);
    });
  });

  describe('When country id is invalid', () => {
    let command: UpdateWordCommand;

    function startScenario() {
      command = UpdateWordCommandMother.random({ countryId: '' });

      const word = WordMother.random({
        id: TermIdMother.random(command.id),
        userId: UserIdMother.random(command.userId),
      });
      termRepository.add(word);
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(InvalidArgumentException);
    });

    it('then should not add the word', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(termRepository.storedChanged()).toBeFalsy();
      expect(termRepository.stored()).toHaveLength(0);
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(eventBus.domainEvents()).toHaveLength(0);
    });
  });

  describe('When the command is valid and the word has a different user id', () => {
    let command: UpdateWordCommand;

    function startScenario() {
      command = UpdateWordCommandMother.random();
      const word = WordMother.random({
        id: TermIdMother.random(command.id),
        userId: UserIdMother.random(),
      });

      termRepository.add(word);
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(TermDoesNotBelongToUserException);
    });

    it('then should not add the word', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(termRepository.storedChanged()).toBeFalsy();
      expect(termRepository.stored()).toHaveLength(0);
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(eventBus.domainEvents()).toHaveLength(0);
    });
  });

  describe('When the command is valid and the word has valid values', () => {
    let command: UpdateWordCommand;
    let expectedWord: Word;
    let wordUpdatedEvent: WordUpdatedEventMother;

    function startScenario() {
      command = UpdateWordCommandMother.random({
        terms: [
          {
            word: 'testWord updated',
            description: 'test description updated',
            example: 'test example updated',
            hashtags: ['updated'],
          },
        ],
      });
      expectedWord = WordMother.random({
        id: TermIdMother.random(command.id),
        userId: UserIdMother.random(command.userId),
        languageId: command.languageId,
        countryId: CountryIdMother.random(command.countryId),
        likes: [],
        terms: WordTermCollectionMother.random(command.terms),
      });
      wordUpdatedEvent = WordUpdatedEventMother.createFromUpdatedWordCommand(command);
      const word = WordMother.random({
        id: TermIdMother.random(command.id),
        userId: UserIdMother.random(command.userId),
        likes: [],
      });

      termRepository.add(word);
    }

    beforeEach(startScenario);

    it('then should update the data', async () => {
      await handler.execute(command);

      const termStored = termRepository.stored();
      expect(termRepository.storedChanged()).toBeTruthy();
      expect(termStored).toHaveLength(1);
      expect(termStored[0].toPrimitives()).toEqual(expectedWord.toPrimitives());
    });

    it('should publish an event', async () => {
      await handler.execute(command);

      expect(eventBus.domainEvents()).toHaveLength(1);
      expect(eventBus.domainEvents()[0]).toEqual({
        ...wordUpdatedEvent,
      });
    });
  });
});
