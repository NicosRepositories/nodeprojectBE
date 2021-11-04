import { Employee } from 'src/domain/employee';

export interface EmployeeRepository {
  searchByName(id: string): Promise<Employee>;
  getAllEmployees(): Promise<Employee[]>;
  //following function gets Implemented if there is enough time for it.
  /**doesEmployeeExist(employeeDetails: {
    mail: string;
    username: string;
  }): Promise<boolean>;*/
  createEmployee(employee: Employee): Promise<string>;
}
