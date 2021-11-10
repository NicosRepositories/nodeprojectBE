import { Job } from './job';

export interface Employee {
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
/** This class combines the information of the employee itself with the more detailed infos about the Job */
export class EmployeeDetail {
  constructor(public employee: Employee, public job: Job) {}
}
