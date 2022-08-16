import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn,
} from "typeorm";

import { generateUUID } from "../helpers/idGenerator";

@Entity("tags")
export class Tag {
	@PrimaryColumn()
	readonly id: string;

	@Column()
	name: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor() {
		if (!this.id) {
			this.id = generateUUID();
		}
	}
}
