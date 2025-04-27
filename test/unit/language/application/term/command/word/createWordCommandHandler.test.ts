import { beforeEach, beforeAll, describe, expect, it, vi } from 'vitest';
import CreateWordCommandHandler from '@src/language/application/term/command/word/createWordCommandHandler';
import { TermRepositoryMock } from '@test/unit/language/domain/term/termRepositoryMock';
import { EventBusMock } from '@test/unit/shared/domain/buses/eventBus/eventBusMock';
import WordMother from '@test/unit/language/domain/term/word/wordMother';
import { CreateWordCommandMother } from '@test/unit/language/application/term/command/word/createWordCommandMother';
import Word from '@src/language/domain/term/word/word';
import { WordCreatedEventMother } from '@test/unit/language/domain/term/word/wordCreatedEventMother';
import CreateWordCommand from '@src/language/application/term/command/word/createWordCommand';
import InvalidArgumentException from '@src/shared/domain/exceptions/invalidArgumentException';
import WordCreatedEvent from '@src/language/domain/term/word/wordCreatedEvent';
import TermAlreadyExistsException from '@src/language/domain/term/termAlreadyExistsException';

describe('Given a CreateWordCommandHandler to handle', () => {
  let eventBus: EventBusMock;
  let termRepository: TermRepositoryMock;
  let handler: CreateWordCommandHandler;

  const prepareDependencies = () => {
    eventBus = new EventBusMock();
    termRepository = new TermRepositoryMock();
  };

  const initHandler = () => {
    handler = new CreateWordCommandHandler(termRepository, eventBus);

    vi.useFakeTimers();
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
    let command: CreateWordCommand;

    function startScenario() {
      command = CreateWordCommandMother.random({ id: '' });
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

  describe('When word already exists', () => {
    let command: CreateWordCommand;

    function startScenario() {
      command = CreateWordCommandMother.random();
      const term = WordMother.createFromCreateWordCommand(command);
      termRepository.add(term);
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(TermAlreadyExistsException);
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
    let command: CreateWordCommand;

    function startScenario() {
      command = CreateWordCommandMother.random({ countryId: '' });
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

  describe('When user id is invalid', () => {
    let command: CreateWordCommand;

    function startScenario() {
      command = CreateWordCommandMother.random({ userId: '' });
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

  describe('When the command is valid and the word does not exists', () => {
    let command: CreateWordCommand;
    let word: Word;
    let wordCreatedEvent: WordCreatedEvent;

    function startScenario() {
      command = CreateWordCommandMother.random();
      word = WordMother.createFromCreateWordCommand(command);
      wordCreatedEvent = WordCreatedEventMother.createFromCreateWordCommand(command);
    }

    beforeEach(startScenario);

    it('should create the word', async () => {
      await handler.execute(command);

      const termStored = termRepository.stored();
      expect(termRepository.storedChanged()).toBeTruthy();
      expect(termStored).toHaveLength(1);
      expect(termStored[0].toPrimitives()).toEqual(word.toPrimitives());
    });

    it('should publish an event', async () => {
      await handler.execute(command);

      expect(eventBus.domainEvents()).toHaveLength(1);
      expect(eventBus.domainEvents()[0]).toEqual({
        ...wordCreatedEvent,
      });
    });
  });
});
