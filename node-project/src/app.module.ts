import { Module } from '@nestjs/common';
import {
  AppController,
  ByeController,
  ILYController,
  PostController,
} from './app.controller';
import { EmployeeController } from './controllers/employee.controller';
import { AppService } from './app.service';
import { EmployeeService } from './services/employee.service';
import { EmployeeMapper } from './mapper/employee.mapper';

@Module({
  imports: [],
  controllers: [
    AppController,
    ByeController,
    ILYController,
    PostController,
    EmployeeController,
  ],
  providers: [
    AppService,
    EmployeeService,
    {
      provide: 'EmployeeRepository',
      useClass: EmployeeMapper,
    },
  ],
})
export class AppModule {}
