import { Injectable } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';

@Injectable()
export class AppService {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  async defaultNestJS() {
    this.rabbitmqService.instance.emit('pattern-nestjs', {
      message: 'Nova mensagem para o RabbitMQ',
    });
  }
}
