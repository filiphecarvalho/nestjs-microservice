import { Inject, Injectable } from '@nestjs/common';
import { RabbitMQProvideType } from './rabbitmq.provider';
import { Channel, Message } from 'amqplib';

type TQueue = 'email' | 'notification';
type TExchange = 'amq.direct';
type TRoutingKey = 'rmq-process';

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

  async publishInExchange(
    exchange: TExchange,
    routingKey: TRoutingKey,
    message: string,
  ) {
    //await this.channel.assertExchange(exchange, 'fanout', { durable: false }); // declara o exchange no rabbitmq
    this.channel.publish(exchange, routingKey, Buffer.from(message)); // envia a message para o exchange do rabbit
  }

  async consumer(queue: TQueue, callback: (message: Message) => void) {
    return this.channel.consume(queue, (message) => {
      if (callback) callback(message);
      this.channel.ack(message);
    });
  }
}
