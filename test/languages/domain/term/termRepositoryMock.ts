import { jest } from '@jest/globals';
import TermRepository from '@src/languages/domain/term/termRepository';

export const TermRepositoryMock = {
  search: jest.fn(),
  save: jest.fn(),
} as TermRepository;
