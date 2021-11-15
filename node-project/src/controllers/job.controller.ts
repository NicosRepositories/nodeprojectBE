import { Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { get } from 'http';
import { Job } from 'src/domain/job';
import { JobService } from '../services/job.service';

/** This Controller contains a single endpoint which will return all Jobs that can be selected when creating an employee */
@Controller('jobs')
export class JobsController {
  constructor(private jobService: JobService) {}

  @Get()
  async getAllJobs(): Promise<Job[]> {
    return await this.jobService.getAllJobs();
  }

  @Get(':id')
  async getJob(@Param('jobid') jobId: number): Promise<Job[]> {
    return await this.jobService.getJob(jobId);
  }
}
