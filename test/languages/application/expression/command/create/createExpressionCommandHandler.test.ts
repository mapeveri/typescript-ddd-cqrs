import { beforeEach, describe, it } from '@jest/globals';
import { EventBusMock } from '@test/shared/domain/buses/eventBus/eventBusMock';
import { UserIdMother } from '@test/languages/domain/user/valueObjects/userIdMother';
import CreateExpressionCommandHandler from '@src/languages/application/expression/command/create/createExpressionCommandHandler';
import { CreateExpressionCommandMother } from './createExpressionCommandMother';
import { ExpressionRepositoryMock } from '@test/languages/domain/expression/expressionRepositoryMock';
import ExpressionMother from '@test/languages/domain/expression/expressionMother';
import Expression from '@src/languages/domain/expression/expression';
import { ExpressionCreatedEventMother } from '@test/languages/domain/expression/domainEvents/expressionCreatedEventMother';

describe('CreateExpressionCommandHandler handle', () => {
  let eventBus: EventBusMock;
  let expressionRepository: ExpressionRepositoryMock;
  let createWordCommandHandler: CreateExpressionCommandHandler;

  beforeEach(() => {
    eventBus = new EventBusMock();

    expressionRepository = new ExpressionRepositoryMock();

    createWordCommandHandler = new CreateExpressionCommandHandler(expressionRepository, eventBus);
  });

  it('should create and save an expression', async () => {
    const command = CreateExpressionCommandMother.random();
    const userId = UserIdMother.random(command.userId);
    const expression: Expression = ExpressionMother.createFromCreateExpressionCommand(command, userId);
    const expressionCreatedEvent = ExpressionCreatedEventMother.createFromCreateExpressionCommand(command);

    await createWordCommandHandler.handle(command);

    expressionRepository.expectSaveCalledWith(expression);
    eventBus.expectPublishCalledWith([expressionCreatedEvent]);
  });
});
