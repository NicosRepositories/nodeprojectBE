import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { AppService } from '../app.service';
import { IMock, It, Mock, Times } from 'typemoq';
import { Employee } from 'src/domain/employee';
import { EmployeeService } from '../services/employee.service';
import { sequelize } from 'database/models';
import { EmployeeFactory } from 'src/domain/employee.factory';

test('that it creates the requested accountRequest', async () => {
  // arrange
  const employee: Employee = {
    employeeID: 7788,
    firstName: 'Unit',
    lastName: 'Test',
    nickName: 'test@gmail.com',
    age: 44,
    yearsAtEnersis: 1,
    mainOffice: 'Testoffice',
    happiness: 1,
    jobID: 93,
  };
  const employeeServiceMock: IMock<EmployeeService> =
    Mock.ofType<EmployeeService>();
  employeeServiceMock
    .setup((service) => service.createEmployee(employee))
    .returns(async () => '7788');

  // act
  const sut: EmployeeController = new EmployeeController(
    employeeServiceMock.object,
  );
  const result = await sut.createEmployee(employee);

  // assert
  expect(result.employeeId).toEqual('7788');
});
