import { ComplimentRepository } from "../repositories/ComplimentRepositories";
import { UserRepository } from "../repositories/UserRepositories";

interface IComplimentRequest {
	message: string;
	user_sender: string;
	user_receiver: string;
	tag_id: string;
}

export class CreateComplimentService {
	async execute({
		message,
		user_receiver,
		user_sender,
		tag_id,
	}: IComplimentRequest) {
		const isUserReceiverValid = await UserRepository.findOneBy({
			id: user_receiver,
		});

		if (user_sender === user_receiver) {
			throw new Error("You can't create a compliment to your self");
		}

		if (!isUserReceiverValid) {
			throw new Error("User does not exists");
		}

		const newCompliment = await ComplimentRepository.create({
			tag_id,
			user_receiver,
			user_sender,
			message,
		});

		await ComplimentRepository.save(newCompliment);

		return(newCompliment)
	}
}
