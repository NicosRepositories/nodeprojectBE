import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize';

@Injectable()
export class DbConnection {
  constructor(
    public readonly reader: Sequelize,
    public readonly writer: Sequelize,
  ) {}
}
