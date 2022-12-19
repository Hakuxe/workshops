import "reflect-metadata";

import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: "src/database/mydb.sqlite",
	migrations: [
      "src/database/migrations/*.ts"
   ],
	entities: ["src/entities/*.ts"],

});
