import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { EmployeeRepository } from 'src/services/employee.repository';
import { Employee, EmployeeDetail } from 'src/domain/employee';
import { InjectConnection } from '@nestjs/sequelize';
import { Connections } from 'src/database';
import { QueryTypes, Sequelize } from 'sequelize';
import { Job } from 'src/domain/job';

dotenv.config();

/** Service that handles the Employees */
@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EmployeeRepository')
    private readonly employeeRepository: EmployeeRepository,
    @InjectConnection(Connections.READER)
    private sequelize: Sequelize,
  ) {}

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

  async searchByName(lastName: any): Promise<EmployeeDetail[]> {
    throw new Error('Method not implemented.');
  }

  async createEmployee(EmployeeDetail: any) {
    throw new Error('Method not implemented.');
  }

  async getJob(jobID: number): Promise<Job> {
    return new Job(2, 'Praktikant IMS', 'Muss lernen.');
  }
}
