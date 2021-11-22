import { Satisfaction } from '../domain/happiness';

export interface SatisfactionRepository {
  getSatisfaction(happiness: number): Promise<Satisfaction[]>;
  getAllOptions(): Promise<Satisfaction[]>;
}
