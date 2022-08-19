import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepositories";

import { JWT_SECRET } from "../helpers/accessEnv";


interface iAuthenticateRequest {
	email: string;
	password: string;
}

export class AuthenticateUserService {
	async execute({ email, password }: iAuthenticateRequest) {
		// verificar se email existe
		const user = await UserRepository.findOneBy({ email });

		if (!user) {
			throw new Error("Email/Password incorrect");
		}

		// verificar se password está certa

		const passwordsMatch = await compare(password, user.password);

		if (!passwordsMatch) {
			throw new Error("Email/Password incorrect");
		}

		//gerar token
		if (!JWT_SECRET) {
			throw new Error("JWT Secret key undefined");
		}

		const token = sign(
			{ email: user.email },

			JWT_SECRET, // colocar numa variavel de ambiente
			{
				subject: user.id,
				expiresIn: "10h",
			}
		);

		return token;
	}
}
