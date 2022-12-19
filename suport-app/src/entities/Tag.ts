import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn,
} from "typeorm";

import { Expose } from "class-transformer";

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

	// configurando exibição de atributo
	@Expose({ name: "name_custom" })
	nameCustrom(): string {
		return `#${this.name}`;
	}

	constructor() {
		if (!this.id) {
			this.id = generateUUID();
		}
	}
}
