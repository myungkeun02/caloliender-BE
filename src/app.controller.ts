import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(@Query() query: { accessToken: string }): string {
    console.log(`accessToken = ${query.accessToken}`);
    const msg = `accessToken = ${query.accessToken}`;
    return this.appService.getHello() + msg;
  }
}
