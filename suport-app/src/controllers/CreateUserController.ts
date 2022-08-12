import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

export class CreateUserController {
	async handle(request: Request, response: Response) {
      const {name, email, admin} = request.body;

      const createUserService = new CreateUserService();

      const newUser = await createUserService.execute({name, email, admin});

      return response.json(newUser);
   }
}