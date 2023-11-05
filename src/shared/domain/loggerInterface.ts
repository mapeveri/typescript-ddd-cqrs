interface LoggerInterface {
  log(message: string): void;
  error(message: string, trace: string): void;
  warning(message: string): void;
}

export default LoggerInterface;

export const LOGGER_INTERFACE = Symbol('LoggerInterface');
