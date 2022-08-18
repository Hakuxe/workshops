import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

export class CreateComplimentController {
	async handle(request: Request, response: Response) {
		const { message, user_receiver, tag_id } = request.body;

		const { user_id } = request;

		const createComplimentService = new CreateComplimentService();

		const newCompliment = await createComplimentService.execute({
			message,
			user_sender: user_id,
			user_receiver,
			tag_id,
		});

		return response.json(newCompliment);
	}
}
