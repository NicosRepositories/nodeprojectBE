import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { IntegerDataType } from 'sequelize/types';
import { Employee, EmployeeDetail } from 'src/domain/employee';
import { EmployeeService, RequestPayload } from 'src/services/employee.service';

/** The object which is used in the controller and FE for getting info of Employees */
export class EmployeeDto {
  public employeeID: number;
  public firstName: string;
  public lastName: string;
  public nickName: string;
  public age: number;
  public mainOffice: string;
  public timeAtEnersis: number;
  public happiness: number;
  public jobID: number;
  public job: {
    jobId: number;
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
    return employees;
  }

  @Get(':lastname')
  async searchByName(@Param('lastname') lastname: string) {
    const employees: EmployeeDetail[] = await this.employeeService.searchByName(
      lastname,
    );
    return employees.map((employee) => new EmployeeDto(employee));
  }

  @Post()
  @ApiParam({ name: 'requestPayload', required: true })
  async createEmployee(@Body() requestPayload: RequestPayload) {
    return {
      employeeId: await this.employeeService.createEmployee(requestPayload),
    };
  }

  @Put()
  @ApiParam({ name: 'requestPayload', required: true })
  async changeSatisfaction(@Body() requestPayload: RequestPayload) {
    return {
      happiness: await this.employeeService.changeSatisfaction(requestPayload),
    };
  }
}
