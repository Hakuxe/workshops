import { Request, Response } from "express";
import { ListReceiveComplimentsService } from "../services/ListReceiveComplimentsService";

export class ListReceiveComplimentsController {
	async handle(request: Request, response: Response) {
		const { user_id } = request;

		const listReceiveComplimentsService = new ListReceiveComplimentsService();

		const list = await listReceiveComplimentsService.execute(user_id);

		return response.json(list);
	}
}
