declare module 'node-dependency-injection-express-middleware' {
  export interface NodeInjectionMiddleware {
    new (options: object): any;
    middleware(): any;
  }
  export class NodeInjectionMiddleware {
    constructor(options: object);
  }

  export default NodeInjectionMiddleware;
}
