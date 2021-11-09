import { Employee } from './employee';

export interface IEmployeeFactory {
  create(
    employeeID: string,
    firstName: string,
    lastName: string,
    nickName: string,
    age: number,
    mainOffice: string,
    yearsAtEnersis: number,
    happiness: number,
    jobID: number,
  ): Employee;
}
