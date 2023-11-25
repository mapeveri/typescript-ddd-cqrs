import { beforeEach, describe, expect, it } from '@jest/globals';
import { EventBusMock } from '@test/shared/domain/buses/eventBus/eventBusMock';
import { UserIdMother } from '@test/languages/domain/user/valueObjects/userIdMother';
import CreateExpressionCommandHandler from '@src/languages/application/expression/command/create/createExpressionCommandHandler';
import { CreateExpressionCommandMother } from './createExpressionCommandMother';
import { ExpressionRepositoryMock } from '@test/languages/domain/expression/expressionRepositoryMock';
import ExpressionMother from '@test/languages/domain/expression/expressionMother';
import Expression from '@src/languages/domain/expression/expression';
import { ExpressionCreatedEventMother } from '@test/languages/domain/expression/domainEvents/expressionCreatedEventMother';
import ExpressionAlreadyExistsException from '@src/languages/domain/expression/exceptions/ExpressionAlreadyExistsException';

describe('CreateExpressionCommandHandler', () => {
  let eventBus: EventBusMock;
  let expressionRepository: ExpressionRepositoryMock;
  let createWordCommandHandler: CreateExpressionCommandHandler;

  beforeEach(() => {
    eventBus = new EventBusMock();
    expressionRepository = new ExpressionRepositoryMock();

    createWordCommandHandler = new CreateExpressionCommandHandler(expressionRepository, eventBus);
  });

  describe('execute', () => {
    it('should raise an exception when expression id already exists', async () => {
      const expression = ExpressionMother.random();
      const command = CreateExpressionCommandMother.random({ id: expression.id.value });
      expressionRepository.add(expression);

      await expect(createWordCommandHandler.execute(command)).rejects.toThrowError(ExpressionAlreadyExistsException);

      expressionRepository.shouldNotStore();
    });

    it('should create an expression', async () => {
      const command = CreateExpressionCommandMother.random();
      const userId = UserIdMother.random(command.userId);
      const expression: Expression = ExpressionMother.createFromCreateExpressionCommand(command, userId);
      const expressionCreatedEvent = ExpressionCreatedEventMother.createFromCreateExpressionCommand(command);

      await createWordCommandHandler.execute(command);

      expressionRepository.shouldStore(expression);
      eventBus.shouldPublish([expressionCreatedEvent]);
    });
  });
});
