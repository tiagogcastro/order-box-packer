import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1758392941132 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		const table = new Table({
			name: "users",
			columns: [
				{
					name: "id",
					type: "uuid",
					isPrimary: true,
					generationStrategy: "uuid",
					default: "uuid_generate_v4()",
				},
				{
					name: "username",
					type: "varchar",
					length: "255",
					isUnique: true,
					isNullable: false,
				},
				{
					name: "password",
					type: "varchar",
					length: "255",
					isNullable: false,
				},
				{
					name: "created_at",
					type: "timestamp",
					default: "CURRENT_TIMESTAMP",
					isNullable: false,
				},
				{
					name: "updated_at",
					type: "timestamp",
					default: "CURRENT_TIMESTAMP",
					onUpdate: "CURRENT_TIMESTAMP",
					isNullable: false,
				},
			],
			indices: [
				{
					name: "IDX_USERS_USERNAME",
					columnNames: ["username"],
					isUnique: true,
				},
			],
		});

		await queryRunner.createTable(table, true);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("users");
	}
}
