import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { EmployeeRepository } from '../services/employee.repository';
import { JobRepository } from './job.repository';
import { SatisfactionRepository } from './satisfaction.repository';
import { Employee, EmployeeDetail } from '../domain/employee';
import { InjectConnection } from '@nestjs/sequelize';
import { Connections } from '../database';
import { QueryTypes, Sequelize } from 'sequelize';
import { Job } from '../domain/job';
import { IEmployeeFactory } from './../domain/iEmployeeFactory';
import { Satisfaction } from '../domain/happiness';

dotenv.config();

export interface RequestPayload {
  firstName: string;
  lastName: string;
  nickName: string;
  age: number;
  mainOffice: string;
  yearsAtEnersis: number;
  happiness: number;
  jobID: number;
  email: string;
  managerID: number;
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

  async searchByName(email: string): Promise<EmployeeDetail[]> {
    const employees: Employee[] = await this.employeeRepository.searchByName(
      email,
    );
    if (employees.length == 0) {
      return [];
    }
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

  async createEmployee(requestPayload: RequestPayload): Promise<number> {
    this.checkParameters(requestPayload);

    const employee: Employee = this.employeeFactory.create(
      requestPayload.firstName,
      requestPayload.lastName,
      requestPayload.nickName,
      requestPayload.age,
      requestPayload.mainOffice,
      requestPayload.yearsAtEnersis,
      requestPayload.happiness,
      requestPayload.jobID,
      requestPayload.email,
      requestPayload.managerID,
    );

    const result = await this.employeeRepository.createEmployee(employee);
    return result;
  }

  private checkParameters(requestPayload: RequestPayload): boolean {
    const hasAllParameters =
      !!requestPayload.firstName &&
      !!requestPayload.lastName &&
      !!requestPayload.nickName &&
      !!requestPayload.age &&
      !!requestPayload.mainOffice &&
      !!requestPayload.yearsAtEnersis &&
      !!requestPayload.happiness &&
      !!requestPayload.jobID;
    !!requestPayload.email;

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
