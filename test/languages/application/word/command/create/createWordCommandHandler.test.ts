import { beforeEach, describe, expect, it } from '@jest/globals';
import CreateWordCommandHandler from '@src/languages/application/word/command/create/createWordCommandHandler';
import { UserRepositoryMock } from '@test/languages/domain/user/userRepositoryMock';
import { eventBusMock } from '@test/shared/domain/buses/eventBus/eventBusMock';
import { WordRepositoryMock } from '@test/languages/domain/word/wordRepositoryMock';
import { EventBus } from '@src/shared/domain/buses/eventBus/eventBus';
import { CreateWordCommandMother } from './createWordCommandMother';
import WordMother from '@test/languages/domain/word/wordMother';
import Word from '@src/languages/domain/word/word';
import { WordCreatedEventMother } from '@test/languages/domain/word/domainEvents/wordCreatedEventMother';
import { UserMother } from '@test/languages/domain/user/userMother';

describe('CreateWordCommandHandler handle', () => {
  let eventBus: EventBus;
  let wordRepository: WordRepositoryMock;
  let userRepository: UserRepositoryMock;
  let createWordCommandHandler: CreateWordCommandHandler;

  beforeEach(() => {
    eventBus = eventBusMock;

    userRepository = new UserRepositoryMock();
    wordRepository = new WordRepositoryMock();

    createWordCommandHandler = new CreateWordCommandHandler(wordRepository, userRepository, eventBus);
  });

  it('should create and save a country', async () => {
    const command = CreateWordCommandMother.random();
    const user = UserMother.random({ id: command.userId });
    const word: Word = WordMother.createFromCreateWordCommand(command, user);
    const wordCreatedEvent = WordCreatedEventMother.createFromCreateWordCommand(command);
    const expectedwordCreatedEvent = { ...wordCreatedEvent, eventId: expect.any(String) };
    userRepository.addUser(user);

    await createWordCommandHandler.handle(command);

    userRepository.assertFindById(user.id);
    wordRepository.assertSaveHasBeenCalledWith(word);
    expect(eventBus.publish).toHaveBeenCalledWith([expectedwordCreatedEvent]);
  });
});
