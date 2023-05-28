import { beforeEach, describe, expect, it } from '@jest/globals';
import { eventBusMock } from '@test/shared/domain/buses/eventBus/eventBusMock';
import { EventBus } from '@src/shared/domain/buses/eventBus/eventBus';
import { UserIdMother } from '@test/languages/domain/user/valueObjects/userIdMother';
import CreateExpressionCommandHandler from '@src/languages/application/expression/command/create/createExpressionCommandHandler';
import { CreateExpressionCommandMother } from './createExpressionCommandMother';
import { ExpressionRepositoryMock } from '@test/languages/domain/expression/expressionRepositoryMock';
import ExpressionMother from '@test/languages/domain/expression/expressionMother';
import Expression from '@src/languages/domain/expression/expression';
import { ExpressionCreatedEventMother } from '@test/languages/domain/expression/domainEvents/expressionCreatedEventMother';

describe('CreateExpressionCommandHandler handle', () => {
  let eventBus: EventBus;
  let expressionRepository: ExpressionRepositoryMock;
  let createWordCommandHandler: CreateExpressionCommandHandler;

  beforeEach(() => {
    eventBus = eventBusMock;

    expressionRepository = new ExpressionRepositoryMock();

    createWordCommandHandler = new CreateExpressionCommandHandler(expressionRepository, eventBus);
  });

  it('should create and save a expression', async () => {
    const command = CreateExpressionCommandMother.random({
      terms: [
        {
          expression: 'Title 1',
          description: 'Description 1',
          example: 'Example 1',
          hashtags: ['#madridExpression'],
        },
      ],
    });
    const userId = UserIdMother.random(command.userId);
    const expression: Expression = ExpressionMother.createFromCreateExpressionCommand(command, userId);
    const expressionCreatedEvent = ExpressionCreatedEventMother.createFromCreateExpressionCommand(command);
    const expectedExpressionCreatedEvent = { ...expressionCreatedEvent, eventId: expect.any(String) };

    await createWordCommandHandler.handle(command);

    expressionRepository.assertSaveHasBeenCalledWith(expression);
    expect(eventBus.publish).toHaveBeenCalledWith([expectedExpressionCreatedEvent]);
  });
});
