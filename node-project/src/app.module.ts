import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { EmployeeController } from 'src/controllers/employee.controller';
import { JobController } from 'src/controllers/job.controller';
//import { AuthGateway } from "src/gateway/auth/auth.gateway";
//import { KeycloakGateway } from "src/gateway/keycloak.gateway";
import { EmployeeService } from 'src/services/employee.service';
import { JobService } from './services/job.service';
//import { RegistrationRequestService } from "src/services/registration-request.service";
//import { RequestManagementService } from "src/services/request-management.service";
import { EmployeeMapper } from 'src/mapper/employee.mapper';
//import { EmployeeFactory } from "src/domain/employee";
//import { RequestManagementController } from "src/controllers/request-management.controller";
import { SequelizeModule } from '@nestjs/sequelize';
// import { DbConnection } from 'src/mapper/DbConnection';
import * as dbConfig from '../config/db.connection.json';
// import { DbConnection } from './mapper/DbConnection';
import { DatabaseModule } from './database/database.module';
//import { DbNames } from "./mapper/DbNames";
import { Sequelize } from 'sequelize';
import { EmployeeFactory } from './domain/employee.factory';

@Module({
  imports: [HttpModule, SequelizeModule, DatabaseModule],
  controllers: [AppController, EmployeeController, JobController],
  providers: [
    AppService,
    EmployeeService,
    JobService,
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
  ],
})
export class AppModule {}
