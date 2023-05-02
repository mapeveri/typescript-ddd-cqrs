declare namespace Express {
  export interface Container {
    get(service: string): any;
  }

  export interface Request {
    container: Container;
    userId?: string;
  }
}
