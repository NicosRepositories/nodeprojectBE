import { Module } from '@nestjs/common';
import {
  AppController,
  ByeController,
  ILYController,
  PostController,
} from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, ByeController, ILYController, PostController],
  providers: [AppService],
})
export class AppModule {}
