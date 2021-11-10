import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Connections } from 'src/database';
import { Employee } from 'src/domain/employee';
import { EmployeeRepository } from 'src/services/employee.repository';
// import { DbConnection } from './DbConnection';
import { QueryTypes, Sequelize } from 'sequelize';
import { Job } from 'src/domain/job';
import { emitWarning } from 'process';

@Injectable()
export class EmployeeMapper implements EmployeeRepository {
  constructor(
    @InjectConnection(Connections.READER)
    private sequelize: Sequelize,
  ) {}

  /** --------------------------------------------------------------- */

  async getAllEmployees(): Promise<Employee[]> {
    const queryResult: any = await this.sequelize.query(
      'SELECT * FROM public.employees',
    );
    const requestArray: Employee[] = queryResult[0].map(
      (employee: any): Employee => ({
        employeeID: employee.employeeID,
        firstName: employee.firstName,
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

  /** --------------------------------------------------------------- */

  async createEmployee(employee: Employee): Promise<string> {
    console.log(employee);
    const queryResult = await this.sequelize.query(
      `INSERT INTO public.employees ("employeeID", firstName, lastName, nickName, age, mainOffice, timeatenersis, happiness, "jobID") 
         VALUES (:ID, :FIRSTNAME, :LASTNAME, :NICKNAME, :AGE, :OFFICE, :YEARS, :HAPPINESS, :JOBID)`,

      {
        replacements: {
          ID: employee.employeeID,
          FIRSTNAME: employee.firstName,
          LASTNAME: employee.lastName,
          NICKNAME: employee.nickName,
          AGE: employee.age,
          OFFICE: employee.mainOffice,
          YEARS: employee.yearsAtEnersis,
          HAPPINESS: employee.happiness,
          JOBID: employee.jobID,
        },
      },
    );

    const modifiedRows = queryResult[0] as { lastname: string }[];
    return modifiedRows[0].lastname;
  }

  /** --------------------------------------------------------------- */

  async getJob(jobID: number): Promise<Job> {
    return new Job(12, 'Test', 'TestJob');
  }

  /** --------------------------------------------------------------- */

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

  /** --------------------------------------------------------------- */

  async searchByName(id: string): Promise<Employee> {
    throw new Error('Method search not implemented.');
  }
}
