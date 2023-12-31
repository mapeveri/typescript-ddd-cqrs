export default class Environment {
  static getVariable(name: string): string {
    const variable = process.env[name] ?? undefined;
    if (!variable) {
      throw new Error(`Undefined variable ${name}`);
    }

    return variable;
  }
}
