import { Request, Response, response } from "express";
import { ListTagService } from "../services/ListTagService";

export class ListTagController {
	async handle(request: Request, response: Response) {
		const listTagService = new ListTagService();

		const list = await listTagService.execute();

		console.log(list);
		return response.json(list);
	}
}
