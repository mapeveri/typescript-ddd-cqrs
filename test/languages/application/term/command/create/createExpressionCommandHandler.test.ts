import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { EventBusMock } from '@test/shared/domain/buses/eventBus/eventBusMock';
import { UserIdMother } from '@test/languages/domain/user/userIdMother';
import CreateExpressionCommandHandler from '@src/languages/application/term/command/create/createExpressionCommandHandler';
import { CreateExpressionCommandMother } from './createExpressionCommandMother';
import ExpressionMother from '@test/languages/domain/term/expression/expressionMother';
import Expression from '@src/languages/domain/term/expression/expression';
import { ExpressionCreatedEventMother } from '@test/languages/domain/term/expression/expressionCreatedEventMother';
import ExpressionAlreadyExistsException from '@src/languages/domain/term/expression/expressionAlreadyExistsException';
import { TermRepositoryMock } from '@test/languages/domain/term/termRepositoryMock';

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
    });

    it('should create an expression', async () => {
      const command = CreateExpressionCommandMother.random();
      const userId = UserIdMother.random(command.userId);
      const expression: Expression = ExpressionMother.createFromCreateExpressionCommand(command, userId);
      const expressionCreatedEvent = ExpressionCreatedEventMother.createFromCreateExpressionCommand(command);

      await createWordCommandHandler.execute(command);

      termRepository.shouldStore(expression);
      eventBus.shouldPublish([expressionCreatedEvent]);
    });
  });
});
