// import { DatabaseConfig as db } from "@enersis/node-shared";
import { SequelizeModuleOptions } from "@nestjs/sequelize";
import * as db from "../../config/db.connection.json";

const dbPort = Number(process?.env?.DB_PORT) || 5432;

export enum Connections {
  READER = "reader",
  WRITER = "writer",
}

export const DatabaseConfigReader = (): SequelizeModuleOptions => ({
  ...DatabaseConfig(),
  host: db.common.host,
  name: Connections.READER,
});

export const DatabaseConfigWriter = (): SequelizeModuleOptions => ({
  ...DatabaseConfig(),
  host: db.common.host,
  name: Connections.WRITER,
});

const DatabaseConfig = (): SequelizeModuleOptions => ({
  dialect: "postgres",
  port: dbPort,
  username: db.common.username,
  password: db.common.password,
  database: db.common.database,
});
