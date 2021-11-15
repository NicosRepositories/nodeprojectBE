import { Inject, Injectable } from '@nestjs/common';
import { Job } from 'src/domain/job';
import { JobRepository } from '../services/job.repository';

/** Service to get all Jobs */
@Injectable()
export class JobService {
  constructor(
    @Inject('JobRepository')
    private readonly jobRepository: JobRepository,
  ) {}
  async getJob(jobID: number): Promise<Job[]> {
    return await this.jobRepository.getJob(jobID);
  }
  async getAllJobs(): Promise<Job[]> {
    return await this.jobRepository.getAllJobs();
  }
}
