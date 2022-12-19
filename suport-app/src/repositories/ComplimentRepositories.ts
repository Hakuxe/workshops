import { AppDataSource } from "../../ormconfig";
import { Compliment } from "../entities/Compliment";

export const ComplimentRepository = AppDataSource.getRepository(Compliment);
