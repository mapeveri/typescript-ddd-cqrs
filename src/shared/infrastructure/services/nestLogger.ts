import Logger from '../../domain/services/logger';
import { Injectable, Logger as NestJsLogger } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export default class NestLogger extends NestJsLogger implements Logger {
  private readonly logger: winston.Logger;

  constructor() {
    super();
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}] - ${message}`;
        }),
      ),
      transports: [new winston.transports.Console()],
    });
  }

  error(message: string, trace?: string) {
    this.logger.error(message, trace);
  }

  warning(message: string) {
    this.logger.warn(message);
  }

  log(message: string) {
    this.logger.info(message);
  }
}
