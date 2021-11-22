import { Satisfaction } from './happiness';
import { Job } from './job';

export interface Employee {
  firstName: string;
  lastName: string;
  nickName: string;
  age: number;
  mainOffice: string;
  yearsAtEnersis: number;
  happiness: number;
  jobID: number;
  email: string;
}
/** This class combines the information of the employee itself with the more detailed infos about the Job and happiness */
export class EmployeeDetail {
  constructor(
    public employee: Employee,
    public job: Job,
    public satisfaction: Satisfaction,
  ) {}
}
