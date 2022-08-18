import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn,
} from "typeorm";

import { Exclude } from "class-transformer";

import { generateUUID } from "../helpers/idGenerator";

@Entity("users")
export class User {
	@PrimaryColumn()
	readonly id: string;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	admin: boolean;

	@Exclude() // não exibir a senha quando a class for chamada
	@Column()
	password: string;

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
