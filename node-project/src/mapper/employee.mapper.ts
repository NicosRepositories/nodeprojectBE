import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Connections } from 'src/database';
import { Employee, EmployeeDetail } from 'src/domain/employee';
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
        firstName: employee.firstname,
        lastName: employee.lastname,
        nickName: employee.nickname,
        age: employee.age,
        mainOffice: employee.mainoffice,
        yearsAtEnersis: employee.timeatenersis,
        happiness: employee.happiness,
        jobID: employee.jobID,
      }),
    );
    return requestArray;
  }

  /** --------------------------------------------------------------- */

  async createEmployee(employee: Employee) {
    const queryResult = await this.sequelize.query(
      `INSERT INTO public.employees ("employeeID", firstname, lastname, nickname, age, mainoffice, timeatenersis, happiness, "jobID") 
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

    return queryResult[0];
  }

  /** --------------------------------------------------------------- */

  async getJob(jobID: number): Promise<Job> {
    return new Job(12, 'Test', 'TestJob');
  }

  /** --------------------------------------------------------------- */

  async doesEmployeeExist() {
    return false;
  }

  /** --------------------------------------------------------------- */

  async searchByName(lastname: string): Promise<Employee[]> {
    const queryResult: any = await this.sequelize.query(
      "SELECT * FROM public.employees WHERE employees.lastname = '" +
        lastname +
        "'",
    );
    const employeeArray: Employee[] = queryResult[0].map(
      (employee: any): Employee => ({
        employeeID: employee.employeeID,
        firstName: employee.firstname,
        lastName: employee.lastname,
        nickName: employee.nickname,
        age: employee.age,
        mainOffice: employee.mainoffice,
        yearsAtEnersis: employee.timeatenersis,
        happiness: employee.happiness,
        jobID: employee.jobID,
      }),
    );
    return employeeArray;
  }
}
