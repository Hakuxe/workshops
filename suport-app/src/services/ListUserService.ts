import { UserRepository } from "../repositories/UserRepositories";
import {instanceToPlain} from "class-transformer"

export class ListUserService {
	async execute() {
      const users = await UserRepository.find();

      return instanceToPlain(users);
   }
}
