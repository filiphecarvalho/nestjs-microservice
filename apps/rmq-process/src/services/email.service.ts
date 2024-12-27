import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class EmailService implements OnModuleInit {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  async onModuleInit() {
    await this.rabbitmqService.start();
    await this.rabbitmqService.consumer('email', (message) => {
      console.log('EmailService: ', message.content.toString());
    });
  }
}
