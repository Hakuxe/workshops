import { AppDataSource } from "../../ormconfig";

export function databaseConnection() {
	AppDataSource.initialize()
		.then(() => {
			console.log("Database connected successfully\n");
		})
		.catch((error) => {
			throw new Error(`Connection Erro ${error}`);
		});
}
