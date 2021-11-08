import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize';

@Injectable()
export class DbConnection {
  static reader: any;
  constructor(
    public readonly reader: Sequelize,
    public readonly writer: Sequelize,
  ) {}
}
