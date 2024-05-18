import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import InvalidArgumentException from '@src/shared/domain/exceptions/invalidArgumentException';
import DislikeTermCommandHandler from '@src/languages/application/term/command/dislikeTermCommandHandler';
import { DislikeTermCommandMother } from '@test/unit/languages/application/term/command/dislikeTermCommandMother';
import DislikeTermCommand from '@src/languages/application/term/command/dislikeTermCommand';

describe('Given a DislikeTermCommandHandler', () => {
  let handler: DislikeTermCommandHandler;

  beforeEach(() => {
    handler = new DislikeTermCommandHandler();

    jest.useFakeTimers();
  });

  describe('When the term id is invalid ', () => {
    let command: DislikeTermCommand;

    function startScenario() {
      command = DislikeTermCommandMother.random({ termId: 'invalid' });
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(InvalidArgumentException);
    });
  });

  describe('When the user id is invalid ', () => {
    let command: DislikeTermCommand;

    function startScenario() {
      command = DislikeTermCommandMother.random({ userId: 'invalid' });
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(InvalidArgumentException);
    });
  });
});
