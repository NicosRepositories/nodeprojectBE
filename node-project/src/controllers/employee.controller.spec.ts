import { Employee, EmployeeDetail } from '../domain/employee';
import { EmployeeService } from '../services/employee.service';
import { Mock, Times } from 'typemoq';
import { EmployeeController } from './employee.controller';
import job from 'database/models/job';
import satisfaction from 'database/models/satisfaction';

const employee: Employee[] = [
  {
    firstName: 'Unit',
    lastName: 'Test',
    nickName: '-',
    age: 44,
    yearsAtEnersis: 1,
    mainOffice: 'Testoffice',
    happiness: 1,
    jobID: 93,
    email: 'test@mail.com',
    managerID: 2,
  },
];

const employeeDetail: EmployeeDetail[] = [];

employeeDetail[0] = new EmployeeDetail(
  employee[0],
  {
    jobID: 1,
    jobName: 'Praktikant (IMS)',
    jobDescription: 'Ausbildung zum Informatiker EFZ, Fokus auf IPA',
  },
  {
    happiness: 8,
    description: 'I like my Job, but it could get even better. (^-^)',
  },
);
test('that it gets all employees', async () => {
  // arrange

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
  employeeServiceMock.verify(
    (repository) => repository.getAllEmployees(),
    Times.once(),
  );

  expect(result).toEqual(employee);
});

test('that it gets a specific employee', async () => {
  // arrange
  const email = employee[0].email;
  const employeeServiceMock = Mock.ofType<EmployeeService>();
  employeeServiceMock
    .setup((service) => service.searchByName(email))
    .returns(async () => employeeDetail);

  // act
  const sut: EmployeeController = new EmployeeController(
    employeeServiceMock.object,
  );
  const result: any = await sut.searchByName(email);

  // assert

  expect(result[0].email).toEqual(email);
});
