import { beforeEach, beforeAll, describe, expect, it, jest } from '@jest/globals';
import InvalidArgumentException from '@src/shared/domain/exceptions/invalidArgumentException';
import DislikeTermCommandHandler from '@src/languages/application/term/command/dislikeTermCommandHandler';
import { DislikeTermCommandMother } from '@test/unit/languages/application/term/command/dislikeTermCommandMother';
import DislikeTermCommand from '@src/languages/application/term/command/dislikeTermCommand';
import { TermRepositoryMock } from '@test/unit/languages/domain/term/termRepositoryMock';
import { UserRepositoryMock } from '@test/unit/languages/domain/user/userRepositoryMock';
import TermDoesNotExistsException from '@src/languages/domain/term/termDoesNotExistsException';
import WordMother from '@test/unit/languages/domain/term/word/wordMother';
import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';
import UserDoesNotExistsException from '@src/languages/domain/user/userDoesNotExistsException';
import { UserMother } from '@test/unit/languages/domain/user/userMother';
import { UserIdMother } from '@test/unit/languages/domain/user/userIdMother';
import { EventBusMock } from '@test/unit/shared/domain/buses/eventBus/eventBusMock';
import { TermDislikedEventMother } from '@test/unit/languages/domain/term/termDislikedEventMother';
import Word from '@src/languages/domain/term/word/word';
import TermLikeMother from '@test/unit/languages/domain/term/termLikeMother';
import { TermLikeIdMother } from '@test/unit/languages/domain/term/termLikeIdMother';

describe('Given a DislikeTermCommandHandler to handle', () => {
  let termRepository: TermRepositoryMock;
  let userRepository: UserRepositoryMock;
  let eventBus: EventBusMock;
  let handler: DislikeTermCommandHandler;

  const USER_ID = '0a8008d5-ab68-4c10-8476-668b5b540e0f';
  const TERM_ID = '7abe3a96-d603-4e87-b69e-e9fb372294de';
  const TERM_LIKE_ID = '98d173b4-8b60-5cde-8688-8cc8dd9f07b8';

  const prepareDependencies = () => {
    termRepository = new TermRepositoryMock();
    userRepository = new UserRepositoryMock();
    eventBus = new EventBusMock();
  };

  const initHandler = () => {
    handler = new DislikeTermCommandHandler(termRepository, userRepository, eventBus);

    jest.useFakeTimers();
  };

  const clean = () => {
    termRepository.clean();
    userRepository.clean();
    eventBus.clean();
  };

  beforeAll(() => {
    prepareDependencies();
    initHandler();
  });

  beforeEach(() => {
    clean();
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

    it('then should not dislike the term', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(termRepository.storedChanged()).toBeFalsy();
      expect(termRepository.stored()).toHaveLength(0);
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(eventBus.domainEvents()).toHaveLength(0);
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

    it('then should not dislike the term', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(termRepository.storedChanged()).toBeFalsy();
      expect(termRepository.stored()).toHaveLength(0);
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(eventBus.domainEvents()).toHaveLength(0);
    });
  });

  describe('When the term does not exists ', () => {
    let command: DislikeTermCommand;

    function startScenario() {
      command = DislikeTermCommandMother.random();
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(TermDoesNotExistsException);
    });

    it('then should not dislike the term', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(termRepository.storedChanged()).toBeFalsy();
      expect(termRepository.stored()).toHaveLength(0);
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(eventBus.domainEvents()).toHaveLength(0);
    });
  });

  describe('When the user does not exists ', () => {
    let command: DislikeTermCommand;

    function startScenario() {
      command = DislikeTermCommandMother.random({ termId: TERM_ID, userId: USER_ID });
      const term = WordMother.random({ id: TermIdMother.random(TERM_ID) });

      termRepository.add(term);
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(UserDoesNotExistsException);
    });

    it('then should not dislike the term', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(termRepository.storedChanged()).toBeFalsy();
      expect(termRepository.stored()).toHaveLength(0);
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(eventBus.domainEvents()).toHaveLength(0);
    });
  });

  describe('When an user dislike a term that the like does not exist', () => {
    let command: DislikeTermCommand;
    let term: Word;

    function startScenario() {
      command = DislikeTermCommandMother.random({ termId: TERM_ID, userId: USER_ID });
      term = WordMother.random({
        id: TermIdMother.random(TERM_ID),
        likes: [
          TermLikeMother.random({
            userId: UserIdMother.random('1cee3a96-d603-4e88-b69e-e9fb372294da'),
            termId: TermIdMother.random(TERM_ID),
            name: 'test',
            photo: '',
          }),
        ],
      });
      const user = UserMother.random({ id: UserIdMother.random(USER_ID) });

      termRepository.add(term);
      userRepository.add(user);
    }

    beforeEach(startScenario);

    it('then should not dislike the term', async () => {
      await handler.execute(command);

      const termStored = termRepository.stored();
      expect(termRepository.storedChanged()).toBeTruthy();
      expect(termStored).toHaveLength(1);
      expect(termStored[0].toPrimitives()).toEqual(term.toPrimitives());
      expect(term.toPrimitives().likes.length).toEqual(1);
    });

    it('then should not publish the events', async () => {
      await handler.execute(command);

      expect(eventBus.domainEvents()).toHaveLength(0);
    });
  });

  describe('When an user dislike a term that the like exist', () => {
    let command: DislikeTermCommand;
    let term: Word;

    function startScenario() {
      command = DislikeTermCommandMother.random({ termId: TERM_ID, userId: USER_ID });
      term = WordMother.random({
        id: TermIdMother.random(TERM_ID),
        likes: [
          TermLikeMother.random({
            id: TermLikeIdMother.random(TERM_LIKE_ID),
            userId: UserIdMother.random(USER_ID),
            termId: TermIdMother.random(TERM_ID),
            name: 'test',
          }),
        ],
      });
      const user = UserMother.random({ id: UserIdMother.random(USER_ID) });

      termRepository.add(term);
      userRepository.add(user);
    }

    beforeEach(startScenario);

    it('then should dislike the term', async () => {
      await handler.execute(command);

      const termStored = termRepository.stored();
      expect(termRepository.storedChanged()).toBeTruthy();
      expect(termStored).toHaveLength(1);
      expect(termStored[0].toPrimitives()).toEqual(term.toPrimitives());
      expect(term.toPrimitives().likes.length).toEqual(0);
    });

    it('then should publish the events', async () => {
      await handler.execute(command);

      expect(eventBus.domainEvents()).toHaveLength(1);
      expect(eventBus.domainEvents()[0]).toEqual({
        ...TermDislikedEventMother.random({ termId: TERM_ID, userId: USER_ID }),
      });
    });
  });
});
