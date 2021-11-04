import { Controller, Get, Param, Post } from '@nestjs/common';
import { get } from 'http';
import { AppService } from '../app.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllEmployees(): string {
    return this.appService.getHello();

    //connect to db

    //select-Query
  }
}
