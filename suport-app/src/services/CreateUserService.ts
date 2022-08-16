// services ou useCases => regras para manipular as entidades

import { UserRepository } from "../repositories/UserRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
	name: string;
	email: string;
	admin?: boolean;
	password: string;
}

export class CreateUserService {
	async execute({ email, name, admin, password }: IUserRequest) {
		if (!email) {
			throw new Error("Email Incorrect");
		}

		const userAlreadyExists = await UserRepository.findOneBy({ email });

		if (userAlreadyExists) {
			throw new Error("User Already exists");
		}

		// if (!password) {
		// 	throw new Error("Password can't be empty");
		// }

		const passwordEncrypted = await hash(password, 8);


		const newUser = UserRepository.create({
			name,
			email,
			admin,
			password: passwordEncrypted,
		});

		await UserRepository.save(newUser);

		return newUser;
	}
}
