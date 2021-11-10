import { v4 } from 'uuid';
import { Employee } from './employee';
import { IEmployeeFactory } from './iEmployeeFactory';

/** This factory knows how to create a new Employee object with the provided parameters */
export class EmployeeFactory implements IEmployeeFactory {
  create(
    employeeID: number,
    firstName: string,
    lastName: string,
    nickName: string,
    age: number,
    mainOffice: string,
    yearsAtEnersis: number,
    happiness: number,
    jobID: number,
  ): Employee {
    const id = v4();
    const accountRequest: Employee = {
      employeeID,
      firstName,
      lastName,
      nickName,
      age,
      mainOffice,
      yearsAtEnersis,
      happiness,
      jobID,
    };
    return accountRequest;
  }
}
