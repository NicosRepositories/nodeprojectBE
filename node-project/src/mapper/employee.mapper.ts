import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Connections } from '../database';
import { Employee, EmployeeDetail } from '../domain/employee';
import { EmployeeRepository } from '../services/employee.repository';
// import { DbConnection } from './DbConnection';
import { QueryTypes, Sequelize } from 'sequelize';
import { Job } from '../domain/job';
import { emitWarning } from 'process';
import { Satisfaction } from '../domain/happiness';

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
        firstName: employee.firstname,
        lastName: employee.lastname,
        nickName: employee.nickname,
        age: employee.age,
        mainOffice: employee.mainoffice,
        yearsAtEnersis: employee.timeatenersis,
        happiness: employee.happiness,
        jobID: employee.jobID,
        email: employee.email,
      }),
    );
    return requestArray;
  }

  /** --------------------------------------------------------------- */

  async createEmployee(employee: Employee) {
    const result = await this.sequelize.query(
      `INSERT INTO public.employees (firstname, lastname, nickname, age, mainoffice, timeatenersis, happiness, "jobID", email) 
         VALUES (:FIRSTNAME, :LASTNAME, :NICKNAME, :AGE, :OFFICE, :YEARS, :HAPPINESS, :JOBID, :EMAIL) ON CONFLICT DO NOTHING`,

      {
        replacements: {
          FIRSTNAME: employee.firstName,
          LASTNAME: employee.lastName,
          NICKNAME: employee.nickName,
          AGE: employee.age,
          OFFICE: employee.mainOffice,
          YEARS: employee.yearsAtEnersis,
          HAPPINESS: employee.happiness,
          JOBID: employee.jobID,
          EMAIL: employee.email,
        },
      },
    );

    return result[1];
  }

  /** --------------------------------------------------------------- */

  async searchByName(email: string): Promise<Employee[]> {
    const queryResult: any = await this.sequelize.query(
      "SELECT * FROM public.employees WHERE employees.email = '" + email + "';",
    );
    const employeeArray: Employee[] = queryResult[0].map(
      (employee: any): Employee => ({
        firstName: employee.firstname,
        lastName: employee.lastname,
        nickName: employee.nickname,
        age: employee.age,
        mainOffice: employee.mainoffice,
        yearsAtEnersis: employee.timeatenersis,
        happiness: employee.happiness,
        jobID: employee.jobID,
        email: employee.email,
      }),
    );
    return employeeArray;
  }

  /** --------------------------------------------------------------- */

  async getJob(jobID: number): Promise<Job[]> {
    const queryResult: any = await this.sequelize.query(
      'SELECT * FROM public.jobs WHERE jobs."jobId" = ' + jobID,
    );
    const jobArray: Job[] = queryResult[0].map(
      (job: any): Job => ({
        jobID: job.jobId,
        jobName: job.jobname,
        jobDescription: job.description,
      }),
    );
    return jobArray;
  }

  /** --------------------------------------------------------------- */

  async getAllJobs(): Promise<Job[]> {
    const queryResult: any = await this.sequelize.query(
      'SELECT * FROM public.jobs',
    );
    const requestArray: Job[] = queryResult[0].map(
      (job: any): Job => ({
        jobID: job.jobId,
        jobName: job.jobname,
        jobDescription: job.descritpion,
      }),
    );
    return requestArray;
  }

  /** --------------------------------------------------------------- */

  async changeSatisfaction(parameters: Array<any>): Promise<number> {
    await this.sequelize.query(
      `UPDATE public.employees SET happiness = ` +
        parameters[1] +
        ` WHERE lastname = '` +
        parameters[0] +
        `'`,
    );

    return parameters[1];
  }

  /** --------------------------------------------------------------- */

  async getSatisfaction(happiness: number): Promise<Satisfaction[]> {
    const queryResult: any = await this.sequelize.query(
      `SELECT * FROM public.satisfactions WHERE happiness = '` +
        happiness +
        `'`,
    );

    const satisfactionArray: Satisfaction[] = queryResult[0].map(
      (satisfaction: any): Satisfaction => ({
        happiness: satisfaction.happiness,
        description: satisfaction.description,
      }),
    );
    return satisfactionArray;
  }

  /** --------------------------------------------------------------- */

  async getAllOptions(): Promise<Satisfaction[]> {
    const queryResult: any = await this.sequelize.query(
      `SELECT * FROM public.satisfactions`,
    );

    return queryResult[0];
  }
}
