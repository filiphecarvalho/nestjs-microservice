import { ConfigService } from '@nestjs/config';
import { connect, Channel } from 'amqplib';

export const RabbitMQProvider = {
  provide: 'RABBITMQ_PROVIDER',
  useFactory: async (configService: ConfigService) => {
    const uri = configService.get<string>('RABBITMQ_URI');
    const connection = await connect(uri);
    const channel = await connection.createChannel();
    return channel;
  },
  inject: [ConfigService],
};

export type RabbitMQProvideType = Promise<Channel>;
