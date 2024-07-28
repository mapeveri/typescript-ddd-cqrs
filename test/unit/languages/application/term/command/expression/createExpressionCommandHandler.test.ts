import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { EventBusMock } from '@test/unit/shared/domain/buses/eventBus/eventBusMock';
import { TermRepositoryMock } from '@test/unit/languages/domain/term/termRepositoryMock';
import CreateExpressionCommandHandler from '@src/languages/application/term/command/expression/createExpressionCommandHandler';
import ExpressionMother from '@test/unit/languages/domain/term/expression/expressionMother';
import { CreateExpressionCommandMother } from '@test/unit/languages/application/term/command/expression/createExpressionCommandMother';
import ExpressionAlreadyExistsException from '@src/languages/domain/term/expression/expressionAlreadyExistsException';
import { UserIdMother } from '@test/unit/languages/domain/user/userIdMother';
import Expression from '@src/languages/domain/term/expression/expression';
import { ExpressionCreatedEventMother } from '@test/unit/languages/domain/term/expression/expressionCreatedEventMother';

describe('CreateExpressionCommandHandler', () => {
  let eventBus: EventBusMock;
  let termRepository: TermRepositoryMock;
  let createWordCommandHandler: CreateExpressionCommandHandler;

  beforeEach(() => {
    eventBus = new EventBusMock();
    termRepository = new TermRepositoryMock();

    createWordCommandHandler = new CreateExpressionCommandHandler(termRepository, eventBus);

    jest.useFakeTimers();
  });

  describe('execute', () => {
    it('should raise an exception when expression id already exists', async () => {
      const expression = ExpressionMother.random();
      const command = CreateExpressionCommandMother.random({ id: expression.id.value });
      termRepository.add(expression);

      await expect(createWordCommandHandler.execute(command)).rejects.toThrowError(ExpressionAlreadyExistsException);

      termRepository.shouldNotStore();
      expect(eventBus.domainEvents()).toHaveLength(0);
    });

    it('should create an expression', async () => {
      const command = CreateExpressionCommandMother.random();
      const userId = UserIdMother.random(command.userId);
      const expression: Expression = ExpressionMother.createFromCreateExpressionCommand(command, userId);
      const expressionCreatedEvent = ExpressionCreatedEventMother.createFromCreateExpressionCommand(command);

      await createWordCommandHandler.execute(command);

      termRepository.shouldStore(expression);
      expect(eventBus.domainEvents()).toHaveLength(1);
      expect(eventBus.domainEvents()[0]).toEqual({
        ...expressionCreatedEvent,
      });
    });
  });
});
