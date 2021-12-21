import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import {
  EmployeeController,
  GeoController,
} from 'src/controllers/employee.controller';
import { JobController } from 'src/controllers/job.controller';
import { EmployeeService } from 'src/services/employee.service';
import { JobService } from './services/job.service';
import { EmployeeMapper } from 'src/mapper/employee.mapper';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from './database/database.module';
import { EmployeeFactory } from './domain/employee.factory';
import { SatisfactionController } from './controllers/satisfaction.controller';
import { SatisfactionService } from './services/satisfaction.service';

@Module({
  imports: [HttpModule, SequelizeModule, DatabaseModule],
  controllers: [
    AppController,
    EmployeeController,
    JobController,
    SatisfactionController,
    GeoController,
  ],
  providers: [
    AppService,
    EmployeeService,
    JobService,
    SatisfactionService,
    {
      provide: 'EmployeeRepository',
      useClass: EmployeeMapper,
    },
    {
      provide: 'IEmployeeFactory',
      useClass: EmployeeFactory,
    },
    {
      provide: 'JobRepository',
      useClass: EmployeeMapper,
    },
    {
      provide: 'SatisfactionRepository',
      useClass: EmployeeMapper,
    },
  ],
})
export class AppModule {}
