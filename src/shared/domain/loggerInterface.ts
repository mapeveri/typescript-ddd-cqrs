interface LoggerInterface {
  debug(message: string): void;
  error(message: string): void;
  info(message: string): void;
}

export default LoggerInterface;

export const LOGGER_INTERFACE = Symbol('LoggerInterface');
