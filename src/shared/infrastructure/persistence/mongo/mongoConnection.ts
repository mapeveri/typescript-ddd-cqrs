import { MongoClient, Db } from 'mongodb';

export default class MongoConnection {
  private static instance: MongoConnection;
  private client: MongoClient;
  public db: Db;

  private constructor() {}

  public static async getInstance(): Promise<MongoConnection> {
    if (!MongoConnection.instance) {
      const repository = new MongoConnection();
      await repository.connect();
      MongoConnection.instance = repository;
    }
    return MongoConnection.instance;
  }

  async connect(): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_DB_URL || '');
    this.db = this.client.db(process.env.MONGO_DB_DATABSE);
  }

  async disconnect(): Promise<void> {
    await this.client.close();
  }
}
