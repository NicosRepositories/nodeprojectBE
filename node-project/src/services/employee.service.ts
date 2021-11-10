import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { EmployeeRepository } from 'src/services/employee.repository';
import { Employee, EmployeeDetail } from 'src/domain/employee';
import { InjectConnection } from '@nestjs/sequelize';
import { Connections } from 'src/database';
import { QueryTypes, Sequelize } from 'sequelize';
import { Job } from 'src/domain/job';
import { IEmployeeFactory } from './../domain/iEmployeeFactory';

dotenv.config();

export interface RequestPayload {
  firstName: string;
  employeeID: string;
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
    @InjectConnection(Connections.READER)
    private sequelize: Sequelize,
    @Inject('IEmployeeFactory')
    private readonly employeeFactory: IEmployeeFactory,
  ) {}

  /** Get all Employees */
  async getAllEmployees(): Promise<EmployeeDetail[]> {
    const employees: Employee[] =
      await this.employeeRepository.getAllEmployees();
    const employeeDetails: EmployeeDetail[] = [];

    for (const employee of employees) {
      employeeDetails.push(
        new EmployeeDetail(
          employee,
          await this.employeeRepository.getJob(employee.jobID),
        ),
      );
    }
    return employeeDetails;
  }

  /** -------------------------------------------------- */

  async searchByName(lastName: any): Promise<EmployeeDetail[]> {
    throw new Error('Method not implemented.');
  }

  /** -------------------------------------------------- */

  async createEmployee(requestPayload: RequestPayload): Promise<string> {
    this.checkParameters(requestPayload);

    if (await this.employeeRepository.doesEmployeeExist(requestPayload)) {
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

  async getJob(jobID: number): Promise<Job> {
    return new Job(2, 'Praktikant IMS', 'Muss lernen.');
  }
}
