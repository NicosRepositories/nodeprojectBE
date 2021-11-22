import { Employee } from '../domain/employee';
import { EmployeeService } from '../services/employee.service';
import { Mock } from 'typemoq';
import { EmployeeController } from './employee.controller';

test('that it gets all employees', async () => {
  // arrange
  const employee: Employee[] = [
    {
      employeeID: 7788,
      firstName: 'Unit',
      lastName: 'Test',
      nickName: 'test@gmail.com',
      age: 44,
      yearsAtEnersis: 1,
      mainOffice: 'Testoffice',
      happiness: 1,
      jobID: 93,
    },
  ];
  const employeeServiceMock = Mock.ofType<EmployeeService>();
  employeeServiceMock
    .setup((service) => service.getAllEmployees())
    .returns(async () => employee);

  // act
  const sut: EmployeeController = new EmployeeController(
    employeeServiceMock.object,
  );
  const result = await sut.getAllEmployees();

  // assert
  expect(result).toEqual(employee);
});
