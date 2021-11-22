import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { EmployeeRepository } from 'src/services/employee.repository';
import { JobRepository } from './job.repository';
import { SatisfactionRepository } from './satisfaction.repository';
import { Employee, EmployeeDetail } from 'src/domain/employee';
import { InjectConnection } from '@nestjs/sequelize';
import { Connections } from 'src/database';
import { QueryTypes, Sequelize } from 'sequelize';
import { Job } from 'src/domain/job';
import { IEmployeeFactory } from './../domain/iEmployeeFactory';
import { Satisfaction } from 'src/domain/happiness';
import satisfaction from 'database/models/satisfaction';
import { SatisfactionService } from './satisfaction.service';

dotenv.config();

export interface RequestPayload {
  employeeID: number;
  firstName: string;
  lastName: string;
  nickName: string;
  age: number;
  mainOffice: string;
  yearsAtEnersis: number;
  happiness: number;
  jobID: number;
}

/** Service that handles the Employees */
@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EmployeeRepository')
    private readonly employeeRepository: EmployeeRepository,
    @Inject('SatisfactionRepository')
    private readonly satisfactionRepository: SatisfactionRepository,
    @Inject('JobRepository')
    private readonly jobRepository: JobRepository,
    @InjectConnection(Connections.READER)
    private sequelize: Sequelize,
    @Inject('IEmployeeFactory')
    private readonly employeeFactory: IEmployeeFactory,
  ) {}

  /** Get all Employees */
  async getAllEmployees(): Promise<Employee[]> {
    const employees: Employee[] =
      await this.employeeRepository.getAllEmployees();

    return employees;
  }

  /** -------------------------------------------------- */

  async searchByName(lastname: string): Promise<EmployeeDetail[]> {
    const employees: Employee[] = await this.employeeRepository.searchByName(
      lastname,
    );
    const jobArray: any = await this.jobRepository.getJob(employees[0].jobID);
    const job: Job = jobArray[0];
    const satisfactionArray: any =
      await this.satisfactionRepository.getSatisfaction(employees[0].happiness);
    const satisfaction: Satisfaction = satisfactionArray[0];

    const employeeDetails: EmployeeDetail[] = [];
    for (const employee of employees) {
      employeeDetails.push(new EmployeeDetail(employee, job, satisfaction));
    }
    return employeeDetails;
  }

  /** -------------------------------------------------- */

  async createEmployee(requestPayload: RequestPayload): Promise<string> {
    this.checkParameters(requestPayload);

    if (await this.employeeRepository.doesEmployeeExist()) {
      throw new ConflictException('this Employee already exists');
    }

    const employee: Employee = this.employeeFactory.create(
      requestPayload.employeeID,
      requestPayload.firstName,
      requestPayload.lastName,
      requestPayload.nickName,
      requestPayload.age,
      requestPayload.mainOffice,
      requestPayload.yearsAtEnersis,
      requestPayload.happiness,
      requestPayload.jobID,
    );

    const employeeId = await this.employeeRepository.createEmployee(employee);
    return employeeId;
  }

  private checkParameters(requestPayload: RequestPayload): boolean {
    const hasAllParameters =
      !!requestPayload.employeeID &&
      !!requestPayload.firstName &&
      !!requestPayload.lastName &&
      !!requestPayload.nickName &&
      !!requestPayload.age &&
      !!requestPayload.mainOffice &&
      !!requestPayload.yearsAtEnersis &&
      !!requestPayload.happiness &&
      !!requestPayload.jobID;

    if (!hasAllParameters) {
      throw new BadRequestException(
        'missing parameters. your parameters are: ' +
          JSON.stringify(requestPayload),
      );
    }
    return true;
  }

  /** ------------------------------------------------ */

  async changeSatisfaction(requestPayload: RequestPayload): Promise<number> {
    const parameters: Array<any> = [
      requestPayload.lastName,
      requestPayload.happiness,
    ];
    return await this.employeeRepository.changeSatisfaction(parameters);
  }
}
