import { Employee, EmployeeDetail } from '../domain/employee';
import { Job } from '../domain/job';
import { RequestPayload } from './employee.service';

export interface EmployeeRepository {
  searchByName(email: string): Promise<Employee[]>;
  getAllEmployees(): Promise<Employee[]>;
  //following function gets Implemented if there is enough time for it.
  /**doesEmployeeExist(employeeDetails: {
    mail: string;
    username: string;
  }): Promise<boolean>;*/
  createEmployee(employee: Employee): any;
  changeSatisfaction(parameters: Array<any>): Promise<number>;
  searchByCanton(canton: string): Promise<String[]>;
}
