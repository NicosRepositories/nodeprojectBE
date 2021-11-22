import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { IntegerDataType } from 'sequelize/types';
import { Employee, EmployeeDetail } from '../domain/employee';
import { Job } from '../domain/job';
import { EmployeeService, RequestPayload } from '../services/employee.service';
import { JobService } from '../services/job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  async getAllJobs() {
    const jobArray: Job[] = await this.jobService.getAllJobs();
    return jobArray.map(
      (job) => new Job(job.jobID, job.jobName, job.jobDescription),
    );
  }

  @Get(':jobid')
  async searchByName(@Param('jobid') jobid: number) {
    const jobs: Job[] = await this.jobService.getJob(jobid);
    return jobs.map(
      (job) => new Job(job.jobID, job.jobName, job.jobDescription),
    );
  }
}
