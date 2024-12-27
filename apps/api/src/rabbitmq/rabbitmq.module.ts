import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'queue-nestjs',
          queueOptions: {
            durable: false,
          },
          // serializer: {
          //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
          //   serialize(value, options?) {
          //     return value.data;
          //   },
          // },
        },
      },
    ]),
  ],
  providers: [RabbitmqService],
  exports: [RabbitmqService],
})
export class RabbitmqModule {}
