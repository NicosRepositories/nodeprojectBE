/**import { Sequelize } from 'sequelize';
import { Employee, EmployeeDetail } from 'src/domain/employee';
import { EmployeeMapper } from './employee.mapper';

test('that all employees can be fetched', async () => {
  // arrange
  const employeeArray: Employee[] = [
    {
      employeeID: 999,
      firstName: 'Test999',
      lastName: 'Employee999',
      nickName: 'Test999',
      age: 23,
      mainOffice: 'Bern (Spitalgasse)',
      yearsAtEnersis: 1,
      happiness: 10,
      jobID: 3,
    },
    {
      employeeID: 998,
      firstName: 'Test998',
      lastName: 'Employee998',
      nickName: 'Test3',
      age: 23,
      mainOffice: 'Bern (Spitalgasse)',
      yearsAtEnersis: 1,
      happiness: 10,
      jobID: 2,
    },
  ];

  // act

  const sut: EmployeeMapper = new EmployeeMapper(new Sequelize());

  employeeArray.forEach((employee) => {
    sut.createEmployee(employee);
  });
  const result: Employee[] = await sut.getAllEmployees();

  // assert
  expect(result).toEqual(employeeArray);
});
*/
