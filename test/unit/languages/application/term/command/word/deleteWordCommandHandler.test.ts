import { beforeEach, beforeAll, describe, expect, it } from '@jest/globals';
import DeleteWordCommandHandler from '@src/languages/application/term/command/word/deleteWordCommandHandler';
import { TermRepositoryMock } from '@test/unit/languages/domain/term/termRepositoryMock';
import WordMother from '@test/unit/languages/domain/term/word/wordMother';
import { DeleteWordCommandMother } from '@test/unit/languages/application/term/command/word/deleteWordCommandMother';
import DeleteWordCommand from '@src/languages/application/term/command/word/deleteWordCommand';
import InvalidArgumentException from '@src/shared/domain/exceptions/invalidArgumentException';
import Word from '@src/languages/domain/term/word/word';

describe('Given a DeleteWordCommandHandler', () => {
  let termRepository: TermRepositoryMock;
  let handler: DeleteWordCommandHandler;

  beforeEach(() => {
    termRepository = new TermRepositoryMock();

    handler = new DeleteWordCommandHandler(termRepository);
  });

  const prepareDependencies = () => {
    termRepository = new TermRepositoryMock();
  };

  const initHandler = () => {
    handler = new DeleteWordCommandHandler(termRepository);
  };

  const clean = () => {
    termRepository.clean();
  };

  beforeAll(() => {
    prepareDependencies();
    initHandler();
  });

  beforeEach(() => {
    clean();
  });

  describe('When the term id is invalid ', () => {
    let command: DeleteWordCommand;

    function startScenario() {
      command = DeleteWordCommandMother.random('invalid');
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(InvalidArgumentException);
    });

    it('then should not delete', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(termRepository.deletedChanged()).toBeFalsy();
      expect(termRepository.deleted()).toHaveLength(0);
    });
  });

  describe('When the term does not exists ', () => {
    let command: DeleteWordCommand;

    function startScenario() {
      const word = WordMother.random();
      command = DeleteWordCommandMother.random(word.id.value);
    }

    beforeEach(startScenario);

    it('then should not delete', async () => {
      await handler.execute(command);

      expect(termRepository.deletedChanged()).toBeFalsy();
      expect(termRepository.deleted()).toHaveLength(0);
    });
  });

  describe('When the word exists', () => {
    let command: DeleteWordCommand;
    let word: Word;

    function startScenario() {
      word = WordMother.random();
      command = DeleteWordCommandMother.random(word.id.value);

      termRepository.add(word);
    }

    beforeEach(startScenario);

    it('then should remove the word', async () => {
      await handler.execute(command);

      const termDeleted = termRepository.deleted();
      expect(termRepository.deletedChanged()).toBeTruthy();
      expect(termDeleted).toHaveLength(1);
      expect(termDeleted[0].toPrimitives()).toEqual(word.toPrimitives());
    });
  });
});
