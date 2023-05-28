import { beforeEach, describe, expect, it } from '@jest/globals';
import CreateWordCommandHandler from '@src/languages/application/word/command/create/createWordCommandHandler';
import { eventBusMock } from '@test/shared/domain/buses/eventBus/eventBusMock';
import { WordRepositoryMock } from '@test/languages/domain/word/wordRepositoryMock';
import { EventBus } from '@src/shared/domain/buses/eventBus/eventBus';
import { CreateWordCommandMother } from './createWordCommandMother';
import WordMother from '@test/languages/domain/word/wordMother';
import Word from '@src/languages/domain/word/word';
import { WordCreatedEventMother } from '@test/languages/domain/word/domainEvents/wordCreatedEventMother';
import { UserIdMother } from '@test/languages/domain/user/valueObjects/userIdMother';

describe('CreateWordCommandHandler handle', () => {
  let eventBus: EventBus;
  let wordRepository: WordRepositoryMock;
  let createWordCommandHandler: CreateWordCommandHandler;

  beforeEach(() => {
    eventBus = eventBusMock;

    wordRepository = new WordRepositoryMock();

    createWordCommandHandler = new CreateWordCommandHandler(wordRepository, eventBus);
  });

  it('should create and save a word', async () => {
    const command = CreateWordCommandMother.random({
      terms: [{
        title: 'Title 1',
        description: 'Description 1',
        example: 'Example 1',
        tagged_words: ['word1'],
      }],
    });
    const userId = UserIdMother.random(command.userId);
    const word: Word = WordMother.createFromCreateWordCommand(command, userId);
    const wordCreatedEvent = WordCreatedEventMother.createFromCreateWordCommand(command);
    const expectedwordCreatedEvent = { ...wordCreatedEvent, eventId: expect.any(String) };

    await createWordCommandHandler.handle(command);

    wordRepository.assertSaveHasBeenCalledWith(word);
    expect(eventBus.publish).toHaveBeenCalledWith([expectedwordCreatedEvent]);
  });
});
