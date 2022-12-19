//Repositories =>  fazer a comunicação da entidade com o banco de dados

import { AppDataSource } from "../../ormconfig";
import { User } from "../entities/User";

export const UserRepository = AppDataSource.getRepository(User)
