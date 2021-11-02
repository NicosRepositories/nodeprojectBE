import { Module } from '@nestjs/common';
import {
  AppController,
  ByeController,
  ILYController,
  PostController,
} from './app.controller';
import { EmployeeController } from './controllers/employee.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    ByeController,
    ILYController,
    PostController,
    EmployeeController,
  ],
  providers: [AppService],
})
export class AppModule {}
