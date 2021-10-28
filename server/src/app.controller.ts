import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('hello')
  getHello() {
    return 'hello';
  }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
