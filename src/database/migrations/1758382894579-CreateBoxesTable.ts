import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateBoxesTable1758382894579 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		const table = new Table({
			name: "boxes",
			columns: [
				{
					name: "id",
					type: "uuid",
					isPrimary: true,
					generationStrategy: "uuid",
					default: "uuid_generate_v4()",
				},
				{
					name: "name",
					type: "varchar",
					isUnique: true,
				},
				{
					name: "height",
					type: "int",
				},
				{
					name: "width",
					type: "int",
				},
				{
					name: "length",
					type: "int",
				},
				{
					name: "active",
					type: "boolean",
					default: true,
				},
			],
			indices: [
				new TableIndex({
					name: "IDX_BOXES_NAME",
					columnNames: ["name"]
				}),
				new TableIndex({
					name: "IDX_BOXES_ACTIVE",
					columnNames: ["active"]
				})
			]
		});

		await queryRunner.createTable(table, true);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("boxes");
	}

}
