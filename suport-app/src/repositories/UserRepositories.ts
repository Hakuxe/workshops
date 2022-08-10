//Repositories =>  fazer a comunicação da entidade com o banco de dados

import { EntityRepository, Repository } from "typeorm";
import { AppDataSource } from "../../ormconfig";
import { User } from "../entities/User";

@EntityRepository(User)
export class UserRepositories extends Repository<User> {

}


export const UserRepository = AppDataSource.getRepository(User)
