import { v4 } from 'uuid';
import { Employee } from './employee';
import { IEmployeeFactory } from './iEmployeeFactory';

/** This factory knows how to create a new Employee object with the provided parameters */
export class EmployeeFactory implements IEmployeeFactory {
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
    homeOffice: string,
  ): Employee {
    const employee: Employee = {
      firstName,
      lastName,
      nickName,
      age,
      mainOffice,
      yearsAtEnersis,
      happiness,
      jobID,
      email,
      managerID,
      homeOffice,
    };
    return employee;
  }
}
