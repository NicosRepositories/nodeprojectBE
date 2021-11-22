import { Job } from '../domain/job';

export interface JobRepository {
  getJob(jobID: number): Promise<Job[]>;
  getAllJobs(): Promise<Job[]>;
}
