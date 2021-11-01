import { Module } from '@nestjs/common';
import { AppController, ByeController, ILYController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, ByeController, ILYController],
  providers: [AppService],
})
export class AppModule {}
