import { Inject, Injectable } from '@nestjs/common';
import { RabbitMQProvideType } from './rabbitmq.provider';
import { Channel } from 'amqplib';

type TQueue = 'email' | 'notification';

@Injectable()
export class RabbitmqService {
  private channel: Channel;

  constructor(
    @Inject('RABBITMQ_PROVIDER')
    private readonly rabbitMQProvide: RabbitMQProvideType,
  ) {}

  async start() {
    if (!this.channel) {
      this.channel = await this.rabbitMQProvide;
    }
  }

  async publishInQueue(queue: TQueue, message: string) {
    await this.channel.assertQueue(queue, { durable: false }); // declara a fila no rabbitmq
    this.channel.sendToQueue(queue, Buffer.from(message)); // envia a message para a fila do rabbitmq
  }
}
