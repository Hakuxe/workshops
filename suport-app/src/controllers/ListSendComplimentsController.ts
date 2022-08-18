import { Request, Response } from "express";
import { ListSendComplimentsService } from "../services/ListSendComplimentsService";

export class ListSendComplimentsController {
	async handle(request: Request, response: Response) {
		const { user_id } = request;
		console.log(user_id)

		const listSendComplimentsService = new ListSendComplimentsService();

		const list = await listSendComplimentsService.execute(user_id);

		return response.json(list);
	}
}
