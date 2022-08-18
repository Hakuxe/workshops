import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

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
		const decode = verify(authToken, "9489c4c01ce849488966d646c4941bb6") as IPayload;

      // recuperar informações do user
      request.user_id = decode.sub;

		return next();
	} catch (err) {
		return response.status(401).end();
	}


}
