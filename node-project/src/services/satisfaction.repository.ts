import { Satisfaction } from 'src/domain/happiness';

export interface SatisfactionRepository {
  getSatisfaction(happiness: number): Promise<Satisfaction[]>;
  getAllOptions(): Promise<Satisfaction[]>;
}
