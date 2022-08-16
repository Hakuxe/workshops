import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepositories";

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
		const token = sign(
			{ email: user.email },
			"9489c4c01ce849488966d646c4941bb6", // colocar numa variavel de ambiente
			{
				subject: user.id,
				expiresIn: "10h",
			}
		);

      return(token);
	}
}
