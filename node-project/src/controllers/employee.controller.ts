import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { EmployeeDetail, Employee } from '../domain/employee';
import { EmployeeService, RequestPayload } from '../services/employee.service';

/** The object which is used in the controller and FE for getting info of Employees */
export class EmployeeDto {
  public firstName: string;
  public lastName: string;
  public nickName: string;
  public age: number;
  public mainOffice: string;
  public timeAtEnersis: number;
  public happiness: number;
  public jobID: number;
  public email: string;
  public managerID: number;
  public homeOffice: string;
  public job: {
    jobId: number;
    name: string;
    descritpion: string;
  };
  public satisfaction: {
    happiness: number;
    descritpion: string;
  };
  constructor(employeeDetail: EmployeeDetail) {
    this.firstName = employeeDetail.employee.firstName;
    this.lastName = employeeDetail.employee.lastName;
    this.nickName = employeeDetail.employee.nickName;
    this.age = employeeDetail.employee.age;
    this.mainOffice = employeeDetail.employee.mainOffice;
    this.timeAtEnersis = employeeDetail.employee.yearsAtEnersis;
    this.happiness = employeeDetail.employee.happiness;
    this.jobID = employeeDetail.employee.jobID;
    this.email = employeeDetail.employee.email;
    this.managerID = employeeDetail.employee.managerID;
    this.homeOffice = employeeDetail.employee.homeOffice;
    this.job = {
      jobId: employeeDetail.job.jobID,
      name: employeeDetail.job.jobName,
      descritpion: employeeDetail.job.jobDescription,
    };
    this.satisfaction = {
      happiness: employeeDetail.satisfaction.happiness,
      descritpion: employeeDetail.satisfaction.description,
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

  @Get(':email')
  async searchByName(@Param('email') email: string) {
    const employees: EmployeeDetail[] | undefined =
      await this.employeeService.searchByName(email);
    if (employees.length == 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Employee with this email does not exist',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return employees.map((employee) => new EmployeeDto(employee));
  }

  @Post()
  @ApiParam({ name: 'requestPayload', required: true })
  async createEmployee(@Body() requestPayload: RequestPayload) {
    const result = await this.employeeService.createEmployee(requestPayload);
    if (result == 0) {
      return {
        status: 'Employee with this email already exists.',
      };
    } else {
      return {
        status: 'Employee was created',
      };
    }
  }

  @Put()
  @ApiParam({ name: 'requestPayload', required: true })
  async changeSatisfaction(@Body() requestPayload: RequestPayload) {
    return {
      happiness: await this.employeeService.changeSatisfaction(requestPayload),
    };
  }
}

@Controller('geo')
export class GeoController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get(':canton')
  async searchByCanton(@Param('canton') canton: string) {
    const names: String[] | undefined =
      await this.employeeService.searchByCanton(canton);
    if (names.length == 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Employee living in ' + canton + ' does not exist',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return names;
  }
}
