import { Column, Entity, PrimaryColumn, CreateDateColumn, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { generateUUID } from "../helpers/idGenerator";
import { Tag } from "./Tag";
import { User } from "./User";

@Entity("compliments")
export class Compliment {
	@PrimaryColumn()
	readonly id: string;

	@Column()
	message: string;

	@Column()
	user_sender: string;

   @JoinColumn({name: "user_sender"})
   @ManyToOne(() => User)
   userSender: User;

	@Column()
	user_receiver: string;

   @JoinColumn({name: "user_receiver"})
   @ManyToOne(() => User)
   userReceiver: User;

	@Column()
	tag_id: string;

   @JoinColumn({name: "tag_id"})
   @ManyToOne(() => Tag)
   tag: Tag;

	@CreateDateColumn()
	created_at: Date;

	constructor() {
		if (!this.id) {
			this.id = generateUUID();
		}
	}
}
