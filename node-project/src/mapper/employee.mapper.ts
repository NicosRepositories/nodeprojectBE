import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Connections } from 'src/database';
import { Employee } from 'src/domain/employee';
import { EmployeeRepository } from 'src/services/employee.repository';
// import { DbConnection } from './DbConnection';
import { QueryTypes, Sequelize } from 'sequelize';
import { Job } from 'src/domain/job';

@Injectable()
export class EmployeeMapper implements EmployeeRepository {
  constructor(
    @InjectConnection(Connections.READER)
    private sequelize: Sequelize,
  ) {}
  async getAllEmployees(): Promise<Employee[]> {
    const queryResult: any = await this.sequelize.query(
      'SELECT * FROM public.employees',
    );
    const requestArray: Employee[] = queryResult[0].map(
      (employee: any): Employee => ({
        firstName: employee.firstName,
        employeeID: employee.employeeID,
        lastName: employee.lastName,
        nickName: employee.nickName,
        age: employee.age,
        mainOffice: employee.mainOffice,
        yearsAtEnersis: employee.yearsAtEnersis,
        happiness: employee.happiness,
        jobID: employee.jobID,
      }),
    );
    return requestArray;
  }
  async createEmployee(employee: Employee): Promise<string> {
    throw new Error('Method not implemented.');
  }

  async getJob(jobID: number): Promise<Job> {
    throw new Error('Method getJob is not implemented');
  }

  async doesEmployeeExist(requestDetails: {
    firstName: string;
    lastName: string;
  }): Promise<boolean> {
    const queryResult: any = await this.sequelize.query(
      `SELECT * FROM public.employees
         WHERE UPPER(firstName)=UPPER(:firstName)
            OR UPPER(lastName)=UPPER(:lastName)`,
      {
        replacements: {
          firstName: requestDetails.firstName,
          lastName: requestDetails.lastName,
        },
      },
    );
    if (queryResult[0].length == 0) {
      return false;
    }
    return true;
  }
  async upsertRequest(employee: Employee): Promise<string> {
    throw new Error('Method not implemented.');
  }
  async searchByName(id: string): Promise<Employee> {
    throw new Error('Method search not implemented.');
  }
}
