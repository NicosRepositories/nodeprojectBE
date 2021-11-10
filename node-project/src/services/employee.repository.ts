import { Employee } from 'src/domain/employee';
import { Job } from 'src/domain/job';
import { RequestPayload } from './employee.service';

export interface EmployeeRepository {
  doesEmployeeExist(requestDetails: {
    firstName: string;
    lastName: string;
  }): Promise<boolean>;
  getJob(jobID: number): Promise<Job>;
  searchByName(id: string): Promise<Employee>;
  getAllEmployees(): Promise<Employee[]>;
  //following function gets Implemented if there is enough time for it.
  /**doesEmployeeExist(employeeDetails: {
    mail: string;
    username: string;
  }): Promise<boolean>;*/
  createEmployee(employee: Employee): Promise<string>;
}
