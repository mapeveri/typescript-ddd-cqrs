import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import AddLikeTermCommandHandler from '@src/languages/application/term/command/create/addLikeTermCommandHandler';
import AddLikeTermCommand from '@src/languages/application/term/command/create/addLikeTermCommand';
import { AddLikeTermCommandMother } from '@test/unit/languages/application/term/command/create/addLikeTermCommandMother';
import InvalidArgumentException from '@src/shared/domain/exceptions/invalidArgumentException';

describe('Given a AddLikeTermCommandHandler', () => {
  const USER_ID = '0a8008d5-ab68-4c10-8476-668b5b540e0f';
  const TERM_ID = '7abe3a96-d603-4e87-b69e-e9fb372294de';
  const TERM_TYPE = 'word';
  let handler: AddLikeTermCommandHandler;

  beforeEach(() => {
    handler = new AddLikeTermCommandHandler();

    jest.useFakeTimers();
  });

  describe('When the term id is invalid ', () => {
    let command: AddLikeTermCommand;

    function startScenario() {
      command = AddLikeTermCommandMother.random({ termId: 'invalid' });
    }

    beforeEach(startScenario);

    it('should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(InvalidArgumentException);
    });
  });

  describe('When the term type is invalid ', () => {
    let command: AddLikeTermCommand;

    function startScenario() {
      command = AddLikeTermCommandMother.random({ type: 'invalid' });
    }

    beforeEach(startScenario);

    it('should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(Error);
    });
  });

  describe('When the user id is invalid ', () => {
    let command: AddLikeTermCommand;

    function startScenario() {
      command = AddLikeTermCommandMother.random({ userId: 'invalid' });
    }

    beforeEach(startScenario);

    it('should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(InvalidArgumentException);
    });
  });

  describe('When an user add a like to a term ', () => {
    let command: AddLikeTermCommand;

    function startScenario() {
      command = AddLikeTermCommandMother.random({ termId: TERM_ID, userId: USER_ID, type: TERM_TYPE });
    }

    beforeEach(startScenario);

    it('should add a new one', async () => {
      expect(await handler.execute(command)).toBeUndefined();
    });
  });
});
