import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { IntegerDataType } from 'sequelize/types';
import { Employee, EmployeeDetail } from '../domain/employee';
import { Satisfaction } from '../domain/happiness';
import { Job } from '../domain/job';
import { EmployeeService, RequestPayload } from '../services/employee.service';
import { SatisfactionService } from '../services/satisfaction.service';
import { JobService } from '../services/job.service';

@Controller('satisfaction')
export class SatisfactionController {
  constructor(private readonly satisfactionService: SatisfactionService) {}

  @Get()
  async getAllOptions() {
    const satisfactionArray: Satisfaction[] =
      await this.satisfactionService.getAllOptions();
    return satisfactionArray.map(
      (satisfaction) =>
        new Satisfaction(satisfaction.happiness, satisfaction.description),
    );
  }

  @Get(':happiness')
  async getSatisfaction(@Param('happiness') happiness: number) {
    const satisfactions: Satisfaction[] =
      await this.satisfactionService.getSatisfaction(happiness);
    return satisfactions[0];
  }
}
