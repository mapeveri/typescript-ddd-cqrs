import Environment from '@src/shared/infrastructure/utils/environment';

export const rabbitMqConfig = {
  urls: [Environment.getVariable('RABBITMQ_HOST')],
  queue: Environment.getVariable('RABBITMQ_EVENTS_QUEUE'),
  queueOptions: {
    durable: true,
  },
};
