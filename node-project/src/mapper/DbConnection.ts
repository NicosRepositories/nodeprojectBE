import { Injectable } from '@nestjs/common';
const Sequelize = require('sequelize');
import * as dbConfig from '../../config/db.connection.json';

@Injectable()
export class DbConnection {
  constructor(
    public readonly reader = new Sequelize(dbConfig.common),
    public readonly writer = new Sequelize(dbConfig.common),
  ) {}
}
