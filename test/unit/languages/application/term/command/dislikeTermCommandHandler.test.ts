import { beforeEach, beforeAll, describe, expect, it, vi } from 'vitest';
import InvalidArgumentException from '@src/shared/domain/exceptions/invalidArgumentException';
import DislikeTermCommandHandler from '@src/languages/application/term/command/dislikeTermCommandHandler';
import { DislikeTermCommandMother } from '@test/unit/languages/application/term/command/dislikeTermCommandMother';
import DislikeTermCommand from '@src/languages/application/term/command/dislikeTermCommand';
import { TermRepositoryMock } from '@test/unit/languages/domain/term/termRepositoryMock';
import TermDoesNotExistsException from '@src/languages/domain/term/termDoesNotExistsException';
import WordMother from '@test/unit/languages/domain/term/word/wordMother';
import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';
import { EventBusMock } from '@test/unit/shared/domain/buses/eventBus/eventBusMock';
import { TermDislikedEventMother } from '@test/unit/languages/domain/term/termDislikedEventMother';
import Word from '@src/languages/domain/term/word/word';
import TermLikeMother from '@test/unit/languages/domain/term/termLikeMother';
import { TermLikeIdMother } from '@test/unit/languages/domain/term/termLikeIdMother';
import { CollaboratorRepositoryMock } from '@test/unit/languages/domain/collaborator/collaboratorRepositoryMock';
import CollaboratorDoesNotExistsException from '@src/languages/domain/collaborator/collaboratorDoesNotExistsException';
import { CollaboratorIdMother } from '@test/unit/languages/domain/collaborator/collaboratorIdMother';
import { CollaboratorMother } from '@test/unit/languages/domain/collaborator/collaboratorMother';
import { IdentityProviderMock } from '@test/unit/shared/domain/services/IdentityProviderMock';

describe('Given a DislikeTermCommandHandler to handle', () => {
  let termRepository: TermRepositoryMock;
  let collaboratorRepository: CollaboratorRepositoryMock;
  let identityProvider: IdentityProviderMock;
  let eventBus: EventBusMock;
  let handler: DislikeTermCommandHandler;

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
    handler = new DislikeTermCommandHandler(termRepository, collaboratorRepository, identityProvider, eventBus);

    vi.useFakeTimers();
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

  describe('When the collaborator id is invalid ', () => {
    let command: DislikeTermCommand;

    function startScenario() {
      command = DislikeTermCommandMother.random({ termId: TERM_ID, userId: 'invalid' });

      const term = WordMother.random({ id: TermIdMother.random(TERM_ID) });

      termRepository.add(term);
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

  describe('When the collaborator does not exists ', () => {
    let command: DislikeTermCommand;

    function startScenario() {
      command = DislikeTermCommandMother.random({ termId: TERM_ID, userId: COLLABORATOR_ID });
      const term = WordMother.random({ id: TermIdMother.random(TERM_ID) });

      termRepository.add(term);
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(CollaboratorDoesNotExistsException);
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

  describe('When an collaborator dislike a term that the like does not exist', () => {
    let command: DislikeTermCommand;
    let term: Word;

    function startScenario() {
      command = DislikeTermCommandMother.random({ termId: TERM_ID, userId: COLLABORATOR_ID });
      term = WordMother.random({
        id: TermIdMother.random(TERM_ID),
        likes: [
          TermLikeMother.random({
            userId: CollaboratorIdMother.random('1cee3a96-d603-4e88-b69e-e9fb372294da'),
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

  describe('When an collaborator dislike a term that the like exist', () => {
    let command: DislikeTermCommand;
    let term: Word;

    function startScenario() {
      command = DislikeTermCommandMother.random({ termId: TERM_ID, userId: COLLABORATOR_ID });
      term = WordMother.random({
        id: TermIdMother.random(TERM_ID),
        likes: [
          TermLikeMother.random({
            id: TermLikeIdMother.random(TERM_LIKE_ID),
            userId: CollaboratorIdMother.random(COLLABORATOR_ID),
            termId: TermIdMother.random(TERM_ID),
            name: 'test',
          }),
        ],
      });
      const collaborator = CollaboratorMother.random({ id: CollaboratorIdMother.random(COLLABORATOR_ID) });

      identityProvider.add(TERM_LIKE_ID);
      termRepository.add(term);
      collaboratorRepository.add(collaborator);
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
        ...TermDislikedEventMother.random({ termId: TERM_ID, userId: COLLABORATOR_ID }),
      });
    });
  });
});
