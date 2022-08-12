import { TagRepository } from "../repositories/TagRepositories";

export class CreateTagService {
	async execute(name: string) {
		if (!name) {
			throw new Error("Tag name can't be empty");
		}

		const tagAlreadyExists = await TagRepository.findOneBy({ name });

		if (tagAlreadyExists) {
			throw new Error("Tag Already Exists");
		}

		// caso usuário não seja admin

		const newTag = await TagRepository.create({ name });

		await TagRepository.save(newTag);

		return newTag;
	}
}
