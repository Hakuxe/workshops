import { TagRepository } from "../repositories/TagRepositories";

import { instanceToPlain } from "class-transformer";

export class ListTagService {
	async execute() {
		const listTags = await TagRepository.find();

		return instanceToPlain(listTags);
	}
}
