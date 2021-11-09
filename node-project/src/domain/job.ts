/** A job with id, name and description */
export class Job {
  constructor(
    public jobID: number,
    public jobName: string,
    public jobDescription: string,
  ) {}
}
