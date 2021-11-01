import { Controller, Get, Param, Post } from '@nestjs/common';
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

@Controller('post-request')
export class PostController {
  constructor(private readonly appService: AppService) {}
  @Post(':name')
  PostLove(@Param('name') name: string) {
    return this.appService.PostLove(name);
  }
}
