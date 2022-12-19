import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/UserRepositories";

export async function ensureAdmin(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const { user_id } = request;

   const user = await UserRepository.findOneBy({ id: user_id });

	const isAdmin =  user?.admin;
   
	if (isAdmin) {
		//  next segue na rota
		return next();
	}

	return response.status(401).json({
		error: "User unauthorized",
	});
}
