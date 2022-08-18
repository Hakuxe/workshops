import { ComplimentRepository } from "../repositories/ComplimentRepositories";

export class ListSendComplimentsService {
	async execute(user_id: string) {
		const compliments = await ComplimentRepository.find({
			where: {
				user_sender: user_id,
			},
		});

		return compliments;
	}
}
