import { ComplimentRepository } from "../repositories/ComplimentRepositories";

export class ListReceiveComplimentsService {
	async execute(user_id: string) {
		const compliments = ComplimentRepository.find({
			where: {
				user_receiver: user_id,
			},
		});

		return compliments;
	}
}
