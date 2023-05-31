import { beforeEach, describe, it } from '@jest/globals';
import CreateWordCommandHandler from '@src/languages/application/word/command/create/createWordCommandHandler';
import { EventBusMock } from '@test/shared/domain/buses/eventBus/eventBusMock';
import { WordRepositoryMock } from '@test/languages/domain/word/wordRepositoryMock';
import { CreateWordCommandMother } from './createWordCommandMother';
import WordMother from '@test/languages/domain/word/wordMother';
import Word from '@src/languages/domain/word/word';
import { WordCreatedEventMother } from '@test/languages/domain/word/domainEvents/wordCreatedEventMother';
import { UserIdMother } from '@test/languages/domain/user/valueObjects/userIdMother';

describe('CreateWordCommandHandler handle', () => {
  let eventBus: EventBusMock;
  let wordRepository: WordRepositoryMock;
  let createWordCommandHandler: CreateWordCommandHandler;

  beforeEach(() => {
    eventBus = new EventBusMock();
    wordRepository = new WordRepositoryMock();

    createWordCommandHandler = new CreateWordCommandHandler(wordRepository, eventBus);
  });

  it('should create and save a word', async () => {
    const command = CreateWordCommandMother.random();
    const userId = UserIdMother.random(command.userId);
    const word: Word = WordMother.createFromCreateWordCommand(command, userId);
    const wordCreatedEvent = WordCreatedEventMother.createFromCreateWordCommand(command);

    await createWordCommandHandler.handle(command);

    wordRepository.expectSaveCalledWith(word);
    eventBus.expectPublishCalledWith([wordCreatedEvent]);
  });
});
