import { Controller, Get } from '@nestjs/common';
import { get } from 'http';
import { AppService } from './app.service';

@Controller('say-hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller('say-bye')
export class ByeController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getBye(): string {
    return this.appService.getBye();
  }
}

@Controller('say-ILY')
export class ILYController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getLove(): string {
    return this.appService.getLove();
  }
}
