import { Inject, Injectable } from '@nestjs/common';
import { Satisfaction } from 'src/domain/happiness';
import { SatisfactionRepository } from './satisfaction.repository';

/** Service to get all Jobs */
@Injectable()
export class SatisfactionService {
  constructor(
    @Inject('SatisfactionRepository')
    private readonly satisfactionRepository: SatisfactionRepository,
  ) {}
  async getSatisfaction(happiness: number): Promise<Satisfaction[]> {
    return await this.satisfactionRepository.getSatisfaction(happiness);
  }
  async getAllOptions(): Promise<Satisfaction[]> {
    return await this.satisfactionRepository.getAllOptions();
  }
}
