import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

export class CreateComplimentController {
	async handle(request: Request, response: Response) {
		const { message, user_sender, user_receiver, tag_id } = request.body;

		const createComplimentService = new CreateComplimentService();

		const newCompliment = await createComplimentService.execute({
			message,
			user_receiver,
			user_sender,
			tag_id,
		});

		return response.json(newCompliment);
	}
}
