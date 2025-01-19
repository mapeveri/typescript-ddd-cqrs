interface Logger {
  log(message: string): void;
  error(message: string, trace?: string): void;
  warning(message: string): void;
}

export default Logger;

export const LOGGER = Symbol('Logger');
