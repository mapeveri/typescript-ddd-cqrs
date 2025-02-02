import { beforeAll, describe, it, expect, vi } from 'vitest';
import TermGetController from '@src/languages/app/controllers/v1/terms/termGetController';
import WordMother from '@test/unit/languages/domain/term/word/wordMother';
import { QueryBus } from '@src/shared/domain/bus/queryBus/queryBus';

describe('Given a TermGetController to handle', () => {
  let sut: TermGetController;
  let queryBusMock: { ask: ReturnType<typeof vi.fn> };

  const prepareDependencies = () => {
    queryBusMock = {
      ask: vi.fn(),
    };
  };

  const initHandler = () => {
    sut = new TermGetController(queryBusMock as QueryBus);

    vi.useFakeTimers();
  };

  beforeAll(() => {
    prepareDependencies();
    initHandler();
  });

  describe('When received a request', () => {
    const word = WordMother.random().toPrimitives();

    it('should return a term', async () => {
      queryBusMock.ask.mockReturnValue({ content: word });
      const response = await sut.run(word.id);

      expect(response).toEqual(word);
    });
  });
});
