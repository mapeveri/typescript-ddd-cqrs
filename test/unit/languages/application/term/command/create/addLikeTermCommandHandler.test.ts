import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import AddLikeTermCommandHandler from '@src/languages/application/term/command/create/addLikeTermCommandHandler';
import AddLikeTermCommand from '@src/languages/application/term/command/create/addLikeTermCommand';
import { AddLikeTermCommandMother } from '@test/unit/languages/application/term/command/create/addLikeTermCommandMother';
import InvalidArgumentException from '@src/shared/domain/exceptions/invalidArgumentException';
import { TermRepositoryMock } from '@test/unit/languages/domain/term/termRepositoryMock';
import WordMother from '@test/unit/languages/domain/term/word/wordMother';
import TermDoesNotExistsException from '@src/languages/domain/term/termDoesNotExistsException';
import { UserRepositoryMock } from '@test/unit/languages/domain/user/userRepositoryMock';
import UserDoesNotExistsException from '@src/languages/domain/user/userDoesNotExistsException';
import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';
import { UserMother } from '@test/unit/languages/domain/user/userMother';
import { UserIdMother } from '@test/unit/languages/domain/user/userIdMother';
import TermLikeCollectionMother from '@test/unit/languages/domain/term/termLikeCollectionMother';
import Term from '@src/languages/domain/term/term';
import { EventBusMock } from '@test/unit/shared/domain/buses/eventBus/eventBusMock';
import { TermLikeAddedEventMother } from '@test/unit/languages/domain/term/termLikeAddedEventMother';

describe('Given a AddLikeTermCommandHandler', () => {
  const USER_ID = '0a8008d5-ab68-4c10-8476-668b5b540e0f';
  const TERM_ID = '7abe3a96-d603-4e87-b69e-e9fb372294de';

  let termRepository: TermRepositoryMock;
  let userRepository: UserRepositoryMock;
  let eventBus: EventBusMock;
  let handler: AddLikeTermCommandHandler;

  beforeEach(() => {
    termRepository = new TermRepositoryMock();
    userRepository = new UserRepositoryMock();
    eventBus = new EventBusMock();

    handler = new AddLikeTermCommandHandler(termRepository, userRepository, eventBus);

    jest.useFakeTimers();
  });

  describe('When the term id is invalid ', () => {
    let command: AddLikeTermCommand;

    function startScenario() {
      command = AddLikeTermCommandMother.random({ termId: 'invalid' });
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(InvalidArgumentException);
    });

    it('then should not add the like', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      termRepository.shouldNotStore();
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      eventBus.shouldNotPublish();
    });
  });

  describe('When the user id is invalid ', () => {
    let command: AddLikeTermCommand;

    function startScenario() {
      command = AddLikeTermCommandMother.random({ userId: 'invalid' });
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(InvalidArgumentException);
    });

    it('then should not add the like', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      termRepository.shouldNotStore();
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      eventBus.shouldNotPublish();
    });
  });

  describe('When the term does not exists ', () => {
    let command: AddLikeTermCommand;

    function startScenario() {
      command = AddLikeTermCommandMother.random();
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(TermDoesNotExistsException);
    });

    it('then should not add the like', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      termRepository.shouldNotStore();
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      eventBus.shouldNotPublish();
    });
  });

  describe('When the user does not exists ', () => {
    let command: AddLikeTermCommand;

    function startScenario() {
      command = AddLikeTermCommandMother.random({ termId: TERM_ID, userId: USER_ID });
      const term = WordMother.random({ id: TermIdMother.random(TERM_ID) });

      termRepository.add(term);
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(UserDoesNotExistsException);
    });

    it('then should not add the like', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      termRepository.shouldNotStore();
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      eventBus.shouldNotPublish();
    });
  });

  describe('When an user add a like to a term that already exists', () => {
    let command: AddLikeTermCommand;
    let term: Term;

    function startScenario() {
      command = AddLikeTermCommandMother.random({ termId: TERM_ID, userId: USER_ID });
      term = WordMother.random({
        id: TermIdMother.random(TERM_ID),
        likes: TermLikeCollectionMother.random([{ userId: USER_ID, name: 'test', photo: '' }]),
      });
      const user = UserMother.random({ id: UserIdMother.random(USER_ID) });

      termRepository.add(term);
      userRepository.add(user);
    }

    beforeEach(startScenario);

    it('then should not add a new like to the term', async () => {
      await handler.execute(command);

      termRepository.shouldStore(term);
      expect(term.likes.toArray().length).toEqual(1);
    });

    it('then should not publish the events', async () => {
      await handler.execute(command);

      eventBus.shouldPublish([]);
    });
  });

  describe('When an user add a like to a term ', () => {
    let command: AddLikeTermCommand;
    let term: Term;
    const NAME = 'Name test';
    const PHOTO = 'http://link';

    function startScenario() {
      command = AddLikeTermCommandMother.random({ termId: TERM_ID, userId: USER_ID });
      term = WordMother.random({
        id: TermIdMother.random(TERM_ID),
        likes: TermLikeCollectionMother.random([]),
      });
      const user = UserMother.random({ id: UserIdMother.random(USER_ID), name: NAME, photo: PHOTO });

      termRepository.add(term);
      userRepository.add(user);
    }

    beforeEach(startScenario);

    it('then should add a new like to the term', async () => {
      await handler.execute(command);

      termRepository.shouldStore(term);
      expect(term.likes.toArray().length).toEqual(1);
    });

    it('then should not publish the events', async () => {
      await handler.execute(command);

      eventBus.shouldPublish([
        TermLikeAddedEventMother.random({ termId: TERM_ID, userId: USER_ID, name: NAME, photo: PHOTO }),
      ]);
    });
  });
});
