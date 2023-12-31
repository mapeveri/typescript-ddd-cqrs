import * as amqp from 'amqplib';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class RabbitMqHandler {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async connect(url: string): Promise<void> {
    this.connection = await amqp.connect(url);
    this.channel = await this.connection.createChannel();
  }

  async publishToQueue(queueName: string, message: any): Promise<void> {
    await this.channel.assertQueue(queueName, { durable: true });
    const messageBuffer = Buffer.from(JSON.stringify(message));

    this.channel.sendToQueue(queueName, messageBuffer, { persistent: true });
  }

  async subscribeToQueue(queueName: string, callback: (msg: amqp.ConsumeMessage | null) => void): Promise<void> {
    await this.channel.assertQueue(queueName, { durable: true });
    await this.channel.consume(queueName, callback, { noAck: false });
  }

  async ackMessage(message: amqp.ConsumeMessage): Promise<void> {
    if (this.channel) {
      this.channel.ack(message);
    }
  }

  async closeConnection(): Promise<void> {
    await this.channel.close();
    await this.connection.close();
  }
}
