import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import AddLikeTermCommandHandler from '@src/languages/application/term/command/create/addLikeTermCommandHandler';
import AddLikeTermCommand from '@src/languages/application/term/command/create/addLikeTermCommand';

describe('Given a AddLikeTermCommandHandler', () => {
  const USER_ID = '0a8008d5-ab68-4c10-8476-668b5b540e0f';
  const TERM_ID = '7abe3a96-d603-4e87-b69e-e9fb372294de';
  const TERM_TYPE = 'word';
  let handler: AddLikeTermCommandHandler;
  const command = new AddLikeTermCommand(TERM_ID, TERM_TYPE, USER_ID);

  beforeEach(() => {
    handler = new AddLikeTermCommandHandler();

    jest.useFakeTimers();
  });

  describe('When an user add a like to a term ', () => {
    it('should add a new one', async () => {
      await handler.execute(command);

      expect(await handler.execute(command)).toBeUndefined();
    });
  });
});
