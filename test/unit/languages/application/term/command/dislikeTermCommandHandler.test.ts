import { beforeEach, describe, expect, it, jest } from '@jest/globals';
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
import Term from '@src/languages/domain/term/term';
import TermLikeCollectionMother from '@test/unit/languages/domain/term/termLikeCollectionMother';
import { UserMother } from '@test/unit/languages/domain/user/userMother';
import { UserIdMother } from '@test/unit/languages/domain/user/userIdMother';
import { EventBusMock } from '@test/unit/shared/domain/buses/eventBus/eventBusMock';
import { TermDislikedEventMother } from '@test/unit/languages/domain/term/termDislikedEventMother';

describe('Given a DislikeTermCommandHandler', () => {
  const USER_ID = '0a8008d5-ab68-4c10-8476-668b5b540e0f';
  const TERM_ID = '7abe3a96-d603-4e87-b69e-e9fb372294de';

  let termRepository: TermRepositoryMock;
  let userRepository: UserRepositoryMock;
  let eventBus: EventBusMock;
  let handler: DislikeTermCommandHandler;

  beforeEach(() => {
    termRepository = new TermRepositoryMock();
    userRepository = new UserRepositoryMock();
    eventBus = new EventBusMock();

    handler = new DislikeTermCommandHandler(termRepository, userRepository, eventBus);

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

    it('then should not dislike the term', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      termRepository.shouldNotStore();
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      eventBus.shouldNotPublish();
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

      termRepository.shouldNotStore();
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      eventBus.shouldNotPublish();
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

      termRepository.shouldNotStore();
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      eventBus.shouldNotPublish();
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

      termRepository.shouldNotStore();
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      eventBus.shouldNotPublish();
    });
  });

  describe('When an user dislike a term that the like does not exist', () => {
    let command: DislikeTermCommand;
    let term: Term;

    function startScenario() {
      command = DislikeTermCommandMother.random({ termId: TERM_ID, userId: USER_ID });
      term = WordMother.random({
        id: TermIdMother.random(TERM_ID),
        likes: TermLikeCollectionMother.random([
          { userId: '1cee3a96-d603-4e88-b69e-e9fb372294da', name: 'test', photo: '' },
        ]),
      });
      const user = UserMother.random({ id: UserIdMother.random(USER_ID) });

      termRepository.add(term);
      userRepository.add(user);
    }

    beforeEach(startScenario);

    it('then should not dislike the term', async () => {
      await handler.execute(command);

      termRepository.shouldStore(term);
      expect(term.likes.toArray().length).toEqual(1);
    });

    it('then should not publish the events', async () => {
      await handler.execute(command);

      eventBus.shouldPublish([]);
    });
  });

  describe('When an user dislike a term that the like exist', () => {
    let command: DislikeTermCommand;
    let term: Term;

    function startScenario() {
      command = DislikeTermCommandMother.random({ termId: TERM_ID, userId: USER_ID });
      term = WordMother.random({
        id: TermIdMother.random(TERM_ID),
        likes: TermLikeCollectionMother.random([{ userId: USER_ID, name: 'test', photo: '' }]),
      });
      const user = UserMother.random({ id: UserIdMother.random(USER_ID) });

      termRepository.add(term);
      userRepository.add(user);
    }

    beforeEach(startScenario);

    it('then should dislike the term', async () => {
      await handler.execute(command);

      termRepository.shouldStore(term);
      expect(term.likes.toArray().length).toEqual(0);
    });

    it('then should publish the events', async () => {
      await handler.execute(command);

      eventBus.shouldPublish([TermDislikedEventMother.random({ termId: TERM_ID, userId: USER_ID })]);
    });
  });
});
