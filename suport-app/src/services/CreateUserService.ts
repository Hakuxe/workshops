// services ou useCases => regras para manipular as entidades

import { UserRepository } from "../repositories/UserRepositories";

interface IUserRequest {
	name: string;
	email: string;
	admin?: boolean ;
}

export class CreateUserService {
	async execute({ email, name, admin }: IUserRequest) {
		if (!email) {
			throw new Error("Email Incorrect");
		}

		const userAlreadyExists = await UserRepository.findOneBy({ email });

		if (userAlreadyExists) {
			throw new Error("User Already exists");
		}

		const newUser = UserRepository.create({
			name,
			email,
			admin,
		});

      await UserRepository.save(newUser);

      return(newUser)
	}
}
