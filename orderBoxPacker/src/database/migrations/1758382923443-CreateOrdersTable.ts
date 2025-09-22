import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateOrdersTable1758382923443 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		const table = new Table({
			name: "orders",
			columns: [
				{
					name: "id",
					type: "uuid",
					isPrimary: true,
					generationStrategy: "uuid",
					default: "uuid_generate_v4()",
				},
				{
					name: "status",
					type: "varchar",
					default: "'pending'",
				},
				{
					name: "created_at",
					type: "timestamp",
					default: "CURRENT_TIMESTAMP",
				},
				{
					name: "updated_at",
					type: "timestamp",
					default: "CURRENT_TIMESTAMP",
				},
			],
			indices: [
				new TableIndex({
					name: "IDX_ORDERS_ORDER_ID",
					columnNames: ["id"]
				}),
				new TableIndex({
					name: "IDX_ORDERS_STATUS",
					columnNames: ["status"]
				}),
				new TableIndex({
					name: "IDX_ORDERS_CREATED_AT",
					columnNames: ["created_at"]
				})
			]
		});

		await queryRunner.createTable(table, true);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("orders");
	}

}
