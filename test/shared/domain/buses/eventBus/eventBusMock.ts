import { jest } from '@jest/globals';
import { EventBus } from '@src/shared/domain/buses/eventBus/eventBus';

export const eventBusMock = {
  register: jest.fn(),
  publish: jest.fn(),
} as EventBus;
