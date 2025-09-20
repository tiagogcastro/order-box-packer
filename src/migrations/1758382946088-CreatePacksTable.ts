import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreatePacksTable1758382946088 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		const table = new Table({
			name: "packs",
			columns: [
				{
					name: "id",
					type: "uuid",
					isPrimary: true,
					generationStrategy: "uuid",
					default: "uuid_generate_v4()",
				},
				{
					name: "orderId",
					type: "uuid",
				},
				{
					name: "boxType",
					type: "varchar",
				},
				{
					name: "products",
					type: "jsonb",
				},
				{
					name: "created_at",
					type: "timestamp",
					default: "now()",
				},
			],
			indices: [
				new TableIndex({
					name: "IDX_PACKS_ORDER_ID",
					columnNames: ["orderId"]
				}),
				new TableIndex({
					name: "IDX_PACKS_BOX_TYPE",
					columnNames: ["boxType"]
				}),
				new TableIndex({
					name: "IDX_PACKS_CREATED_AT",
					columnNames: ["created_at"]
				})
			],
			foreignKeys: [
				new TableForeignKey({
					columnNames: ["boxType"],
					referencedColumnNames: ["name"],
					referencedTableName: "boxes",
					onDelete: "RESTRICT",
					onUpdate: "CASCADE"
				}),
				new TableForeignKey({
					columnNames: ["orderId"],
					referencedColumnNames: ["id"],
					referencedTableName: "orders",
					onDelete: "CASCADE",
					onUpdate: "CASCADE"
				})
			]
		});

		await queryRunner.createTable(table, true);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("packs");
	}

}
