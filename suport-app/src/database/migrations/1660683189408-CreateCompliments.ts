import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from "typeorm";

export class CreateCompliments1660683189408 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "compliments",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
					},
					{
						name: "message",
						type: "varchar",
					},
					{
						name: "created_at",
						type: "timestamp",
						default: "now()",
					},
					{
						name: "user_sender",
						type: "uuid",
					},
					{
						name: "user_receiver",
						type: "uuid",
					},
					{
						name: "tag_id",
						type: "uuid",
					},
				],
				foreignKeys: [
					{
						name: "Fk_User_Sender_Compliments",
						referencedTableName: "users",
						referencedColumnNames: ["id"],
						columnNames: ["user_sender"],
						onDelete: "SET NULL",
						onUpdate: "SET NULL",
					},
					{
						name: "Fk_User_Receiver_Compliments",
						referencedTableName: "users",
						referencedColumnNames: ["id"],
						columnNames: ["user_receiver"],
						onDelete: "SET NULL",
						onUpdate: "SET NULL",
					},
					{
						name: "Fk_Tag_Compliments",
						referencedTableName: "tags",
						referencedColumnNames: ["id"],
						columnNames: ["tag_id"],
						onDelete: "SET NULL",
						onUpdate: "SET NULL",
					},
				],
			})
		);

        /* outra forma de fazer
            await queryRunner.createForeignKey("compliments", new TableForeignKey({
                name: "Fk_User_Sender_Compliments",
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                columnNames: ["user_sender"],
                onDelete:"SET NULL",
                onUpdate:"SET NULL"

            })); 
        */
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("compliments");
	}
}
