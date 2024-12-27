import { Controller } from '@nestjs/common';
import { RmqProcessService } from './rmq-process.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class RmqProcessController {
  constructor(private readonly rmqProcessService: RmqProcessService) {}

  @MessagePattern('pattern-nestjs')
  async defaultNestJS(@Payload() data: any, @Ctx() context: RmqContext) {
    return this.rmqProcessService.defaultNestJS(data, context);
  }
}
