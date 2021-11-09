import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { DatabaseConfigReader, DatabaseConfigWriter } from "./database.config";

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...DatabaseConfigReader(),
    }),
    SequelizeModule.forRoot({
      ...DatabaseConfigWriter(),
    }),
  ],
})
export class DatabaseModule {}
