import { Injectable } from '@nestjs/common';
import { Employee } from 'src/domain/employee';
import { EmployeeRepository } from 'src/services/employee.repository';
import { DbConnection } from './DbConnection';

@Injectable()
export class EmployeeMapper implements EmployeeRepository {
  constructor(private dbConnection: DbConnection) {}
  searchByName(id: string): Promise<Employee> {
    throw new Error('Method not implemented.');
  }
  async getAllEmployees(): Promise<Employee[]> {
    const queryResult: any = await this.dbConnection.reader.query(
      'SELECT * FROM public.employees',
    );
    const requestArray: Employee[] = queryResult[0].map(
      (employee: any): Employee => ({
        firstName: employee.firstName,
        employeeID: employee.employeeID,
        lastName: employee.lastName,
        nickName: employee.nickName,
        age: employee.age,
        mainOffice: employee.mainOffice,
        yearsAtEnersis: employee.yearsAtEnersis,
        happiness: employee.happiness,
        jobID: employee.jobID,
      }),
    );
    return requestArray;
  }
  createEmployee(employee: Employee): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
