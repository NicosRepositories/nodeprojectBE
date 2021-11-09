import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { EmployeeRepository } from 'src/services/employee.repository';
import { Employee, EmployeeDetail } from 'src/domain/employee';
import { InjectConnection } from '@nestjs/sequelize'
import { Connections } from 'src/database';
import { QueryTypes, Sequelize } from "sequelize";

dotenv.config();

/** Service that handles the Employees */
@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EmployeeRepository')
    private readonly employeeRepository: EmployeeRepository,
    @InjectConnection(Connections.READER)
    private sequelize: Sequelize
  ) {}

  async getAllEmployees(): Promise<Employee[]> {
    const employee = await this.employeeRepository.getAllEmployees();

    return employee;
  }

  async searchByName(lastName: any): Promise<EmployeeDetail[]> {
    throw new Error('Method not implemented.');
  }

  async createEmployee(EmployeeDetail: any) {
    throw new Error('Method not implemented.');
  }
}
