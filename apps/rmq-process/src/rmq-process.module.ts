import { Module } from '@nestjs/common';
import { RmqProcessService } from './rmq-process.service';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { EmailService } from './services/email.service';
import { NotificationService } from './services/notification.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RabbitmqModule],
  providers: [RmqProcessService, EmailService, NotificationService],
})
export class RmqProcessModule {}
