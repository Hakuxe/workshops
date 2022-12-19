import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { JWT_SECRET } from "../helpers/accessEnv"

interface IPayload {
	sub: string;
}

export function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction
) {
	// receber o token
	const token = request.headers.authorization;

	// validar se está preenchido
	if (!token) {
		return response.status(401).end();
	}

	// validar token
	const [, authToken] = token.split(" "); //desestruturando a segunda variável do array

	try {

		if (!JWT_SECRET) {
			throw new Error("JWT Secret key undefined");
		}

		const decode = verify(authToken, JWT_SECRET) as IPayload;

		// recuperar informações do user
		request.user_id = decode.sub;

		return next();
	} catch (err) {
		return response.status(401).end();
	}
}
