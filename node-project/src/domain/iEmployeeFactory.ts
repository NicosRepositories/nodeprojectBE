import { Employee } from './employee';

export interface IEmployeeFactory {
  create(
    firstName: string,
    lastName: string,
    nickName: string,
    age: number,
    mainOffice: string,
    yearsAtEnersis: number,
    happiness: number,
    jobID: number,
    email: string,
    managerID: number,
  ): Employee;
}
