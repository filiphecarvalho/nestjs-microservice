import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('defaul-nestjs')
  async defaultNestJS() {
    return this.appService.defaultNestJS();
  }
}
