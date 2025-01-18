import { beforeEach, beforeAll, describe, expect, it, jest } from '@jest/globals';
import AddLikeTermCommandHandler from '@src/languages/application/term/command/addLikeTermCommandHandler';
import AddLikeTermCommand from '@src/languages/application/term/command/addLikeTermCommand';
import { AddLikeTermCommandMother } from '@test/unit/languages/application/term/command/addLikeTermCommandMother';
import InvalidArgumentException from '@src/shared/domain/exceptions/invalidArgumentException';
import { TermRepositoryMock } from '@test/unit/languages/domain/term/termRepositoryMock';
import WordMother from '@test/unit/languages/domain/term/word/wordMother';
import TermDoesNotExistsException from '@src/languages/domain/term/termDoesNotExistsException';
import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';
import { EventBusMock } from '@test/unit/shared/domain/buses/eventBus/eventBusMock';
import { TermLikeAddedEventMother } from '@test/unit/languages/domain/term/termLikeAddedEventMother';
import TermLikeMother from '@test/unit/languages/domain/term/termLikeMother';
import Word from '@src/languages/domain/term/word/word';
import { TermLikeIdMother } from '@test/unit/languages/domain/term/termLikeIdMother';
import { CollaboratorRepositoryMock } from '@test/unit/languages/domain/collaborator/collaboratorRepositoryMock';
import { CollaboratorMother } from '@test/unit/languages/domain/collaborator/collaboratorMother';
import { CollaboratorIdMother } from '@test/unit/languages/domain/collaborator/collaboratorIdMother';
import CollaboratorDoesNotExistsException from '@src/languages/domain/collaborator/collaboratorDoesNotExistsException';
import { IdentityProviderMock } from '@test/unit/shared/domain/services/IdentityProviderMock';

describe('Given a AddLikeTermCommandHandler to handle', () => {
  let termRepository: TermRepositoryMock;
  let collaboratorRepository: CollaboratorRepositoryMock;
  let eventBus: EventBusMock;
  let identityProvider: IdentityProviderMock;
  let handler: AddLikeTermCommandHandler;

  const COLLABORATOR_ID = '0a8008d5-ab68-4c10-8476-668b5b540e0f';
  const TERM_ID = '7abe3a96-d603-4e87-b69e-e9fb372294de';
  const TERM_LIKE_ID = '98d173b4-8b60-5cde-8688-8cc8dd9f07b8';

  const prepareDependencies = () => {
    termRepository = new TermRepositoryMock();
    collaboratorRepository = new CollaboratorRepositoryMock();
    identityProvider = new IdentityProviderMock();
    eventBus = new EventBusMock();
  };

  const initHandler = () => {
    handler = new AddLikeTermCommandHandler(termRepository, collaboratorRepository, identityProvider, eventBus);

    jest.useFakeTimers();
  };

  const clean = () => {
    termRepository.clean();
    collaboratorRepository.clean();
    identityProvider.clean();
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

      expect(termRepository.storedChanged()).toBeFalsy();
      expect(termRepository.stored()).toHaveLength(0);
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(eventBus.domainEvents()).toHaveLength(0);
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

      expect(termRepository.storedChanged()).toBeFalsy();
      expect(termRepository.stored()).toHaveLength(0);
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(eventBus.domainEvents()).toHaveLength(0);
    });
  });

  describe('When the collaborator id is invalid ', () => {
    let command: AddLikeTermCommand;

    function startScenario() {
      command = AddLikeTermCommandMother.random({ termId: TERM_ID, userId: 'invalid' });

      const term = WordMother.random({ id: TermIdMother.random(TERM_ID) });
      termRepository.add(term);
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(InvalidArgumentException);
    });

    it('then should not add the like', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(termRepository.storedChanged()).toBeFalsy();
      expect(termRepository.stored()).toHaveLength(0);
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(eventBus.domainEvents()).toHaveLength(0);
    });
  });

  describe('When the collaborator does not exists ', () => {
    let command: AddLikeTermCommand;

    function startScenario() {
      command = AddLikeTermCommandMother.random({ termId: TERM_ID, userId: COLLABORATOR_ID });
      const term = WordMother.random({ id: TermIdMother.random(TERM_ID) });

      termRepository.add(term);
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(CollaboratorDoesNotExistsException);
    });

    it('then should not add the like', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(termRepository.storedChanged()).toBeFalsy();
      expect(termRepository.stored()).toHaveLength(0);
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(eventBus.domainEvents()).toHaveLength(0);
    });
  });

  describe('When an collaborator add a like to a term that already exists', () => {
    let command: AddLikeTermCommand;
    let term: Word;

    function startScenario() {
      command = AddLikeTermCommandMother.random({ termId: TERM_ID, userId: COLLABORATOR_ID });

      term = WordMother.random({
        id: TermIdMother.random(TERM_ID),
        likes: [
          TermLikeMother.random({
            id: TermLikeIdMother.random(TERM_LIKE_ID),
            userId: CollaboratorIdMother.random(COLLABORATOR_ID),
            termId: TermIdMother.random(TERM_ID),
            name: 'test',
            photo: '',
          }),
        ],
      });
      const collaborator = CollaboratorMother.random({ id: CollaboratorIdMother.random(COLLABORATOR_ID) });

      identityProvider.add(TERM_LIKE_ID);
      termRepository.add(term);
      collaboratorRepository.add(collaborator);
    }

    beforeEach(startScenario);

    it('then should not add a new like to the term', async () => {
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

  describe('When an collaborator add a like to a term ', () => {
    let command: AddLikeTermCommand;
    let term: Word;
    const NAME = 'Name test';
    const PHOTO = 'http://link';

    function startScenario() {
      command = AddLikeTermCommandMother.random({ termId: TERM_ID, userId: COLLABORATOR_ID });
      term = WordMother.random({
        id: TermIdMother.random(TERM_ID),
        likes: [],
      });
      const user = CollaboratorMother.random({
        id: CollaboratorIdMother.random(COLLABORATOR_ID),
        name: NAME,
        photo: PHOTO,
      });

      identityProvider.add(TERM_LIKE_ID);
      termRepository.add(term);
      collaboratorRepository.add(user);
    }

    beforeEach(startScenario);

    it('then should add a new like to the term', async () => {
      await handler.execute(command);

      const termStored = termRepository.stored();
      expect(termRepository.storedChanged()).toBeTruthy();
      expect(termStored).toHaveLength(1);
      expect(termStored[0].toPrimitives()).toEqual(term.toPrimitives());
      expect(term.toPrimitives().likes.length).toEqual(1);
    });

    it('then should publish the events', async () => {
      await handler.execute(command);

      expect(eventBus.domainEvents()).toHaveLength(1);
      expect(eventBus.domainEvents()[0]).toEqual({
        ...TermLikeAddedEventMother.random({ termId: TERM_ID, userId: COLLABORATOR_ID, name: NAME, photo: PHOTO }),
      });
    });
  });
});
