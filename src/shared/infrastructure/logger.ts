import { Logger as TsLog } from 'tslog';
import LoggerInterface from '../domain/loggerInterface';

export default class Logger implements LoggerInterface {
  private logger: TsLog;

  constructor() {
    this.logger = new TsLog();
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  info(message: string): void {
    this.logger.info(message);
  }
}
