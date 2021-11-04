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
  getAllEmployees(): Promise<Employee[]> {
    throw new Error('Method not implemented.');
  }
  createEmployee(employee: Employee): Promise<string> {
    throw new Error('Method not implemented.');
  }

  /** Following Code is only for copy-pasta purposes and will be removed when finished.
    
    async getAllRequests(): Promise<AccountRequest[]> {
    const queryResult: any = await this.dbConnection.reader.query(
      "SELECT * FROM " + this.dbNames.requestFullPath,
    );
    const requestArray: AccountRequest[] = queryResult[0].map(
      (request: any): AccountRequest => ({
        id: request.rid,
        username: request.username,
        mail: request.mail,
        firstName: request.firstname,
        surname: request.surname,
        regionId: request.home_region_id,
        permission: this.reverseMapPermission(Number(request.permissions)),
      }),
    );
    return requestArray;
    */
}
