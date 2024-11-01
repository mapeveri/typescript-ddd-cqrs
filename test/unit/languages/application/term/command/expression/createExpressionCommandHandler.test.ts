import { beforeEach, beforeAll, describe, expect, it, jest } from '@jest/globals';
import { EventBusMock } from '@test/unit/shared/domain/buses/eventBus/eventBusMock';
import { TermRepositoryMock } from '@test/unit/languages/domain/term/termRepositoryMock';
import CreateExpressionCommandHandler from '@src/languages/application/term/command/expression/createExpressionCommandHandler';
import ExpressionMother from '@test/unit/languages/domain/term/expression/expressionMother';
import { CreateExpressionCommandMother } from '@test/unit/languages/application/term/command/expression/createExpressionCommandMother';
import Expression from '@src/languages/domain/term/expression/expression';
import { ExpressionCreatedEventMother } from '@test/unit/languages/domain/term/expression/expressionCreatedEventMother';
import CreateExpressionCommand from '@src/languages/application/term/command/expression/createExpressionCommand';
import InvalidArgumentException from '@src/shared/domain/exceptions/invalidArgumentException';
import ExpressionCreatedEvent from '@src/languages/domain/term/expression/expressionCreatedEvent';
import TermAlreadyExistsException from '@src/languages/domain/term/termAlreadyExistsException';

describe('Given a CreateExpressionCommandHandler to handle', () => {
  let eventBus: EventBusMock;
  let termRepository: TermRepositoryMock;
  let handler: CreateExpressionCommandHandler;

  const prepareDependencies = () => {
    eventBus = new EventBusMock();
    termRepository = new TermRepositoryMock();
  };

  const initHandler = () => {
    handler = new CreateExpressionCommandHandler(termRepository, eventBus);

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
    let command: CreateExpressionCommand;

    function startScenario() {
      command = CreateExpressionCommandMother.random({ id: '' });
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(InvalidArgumentException);
    });

    it('then should not add the expression', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(termRepository.storedChanged()).toBeFalsy();
      expect(termRepository.stored()).toHaveLength(0);
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(eventBus.domainEvents()).toHaveLength(0);
    });
  });

  describe('When expression already exists', () => {
    let command: CreateExpressionCommand;

    function startScenario() {
      command = CreateExpressionCommandMother.random();
      const term = ExpressionMother.createFromCreateExpressionCommand(command);
      termRepository.add(term);
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(TermAlreadyExistsException);
    });

    it('then should not add the expression', async () => {
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
    let command: CreateExpressionCommand;

    function startScenario() {
      command = CreateExpressionCommandMother.random({ countryId: '' });
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(InvalidArgumentException);
    });

    it('then should not add the expression', async () => {
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
    let command: CreateExpressionCommand;

    function startScenario() {
      command = CreateExpressionCommandMother.random({ userId: '' });
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(InvalidArgumentException);
    });

    it('then should not add the expression', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(termRepository.storedChanged()).toBeFalsy();
      expect(termRepository.stored()).toHaveLength(0);
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(eventBus.domainEvents()).toHaveLength(0);
    });
  });

  describe('When the command is valid and the expression does not exists', () => {
    let command: CreateExpressionCommand;
    let expression: Expression;
    let expressionCreatedEvent: ExpressionCreatedEvent;

    function startScenario() {
      command = CreateExpressionCommandMother.random();
      expression = ExpressionMother.createFromCreateExpressionCommand(command);
      expressionCreatedEvent = ExpressionCreatedEventMother.createFromCreateExpressionCommand(command);
    }

    beforeEach(startScenario);

    it('should create the expression', async () => {
      await handler.execute(command);

      const termStored = termRepository.stored();
      expect(termRepository.storedChanged()).toBeTruthy();
      expect(termStored).toHaveLength(1);
      expect(termStored[0].toPrimitives()).toEqual(expression.toPrimitives());
    });

    it('should publish an event', async () => {
      await handler.execute(command);

      expect(eventBus.domainEvents()).toHaveLength(1);
      expect(eventBus.domainEvents()[0]).toEqual({
        ...expressionCreatedEvent,
      });
    });
  });
});
