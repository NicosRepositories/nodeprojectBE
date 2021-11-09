import { Controller, Get, Param, Post } from '@nestjs/common';
import { IntegerDataType } from 'sequelize/types';
import { Employee, EmployeeDetail } from 'src/domain/employee';
import { EmployeeService } from 'src/services/employee.service';


/** The object which is used in the controller and FE for getting info of Employees */
export class EmployeesDto {
  public employeeID: string;
  public firstName: string;
  public lastName: string;
  public nickName: string;
  public age: number;
  public mainOffice: string;
  public timeAtEnersis: number;
  public happiness: number;
  public jobID: string;
  public job: {
    jobId: string;
    name: string;
    descritpion: string;
  };
  constructor(employeeDetail: EmployeeDetail) {
    this.employeeID = employeeDetail.employee.employeeID;
    this.firstName = employeeDetail.employee.firstName;
    this.lastName = employeeDetail.employee.lastName;
    this.nickName = employeeDetail.employee.nickName;
    this.age = employeeDetail.employee.age;
    this.mainOffice = employeeDetail.employee.mainOffice;
    this.timeAtEnersis = employeeDetail.employee.yearsAtEnersis;
    this.happiness = employeeDetail.employee.happiness;
    this.jobID = employeeDetail.employee.jobID;
    this.job = {
      jobId: employeeDetail.job.jobID,
      name: employeeDetail.job.jobName,
      descritpion: employeeDetail.job.jobDescription,
    };
  }
}
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getAllEmployees() {
    const employees: Employee[] = await this.employeeService.getAllEmployees();
    return employees.map((employee) => )

    //connect to db

    //select-Query
  }
}
