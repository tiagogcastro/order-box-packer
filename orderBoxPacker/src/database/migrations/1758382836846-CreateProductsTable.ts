import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateProductsTable1758382836846 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		const table = new Table({
			name: "products",
			columns: [
				{
					name: "id",
					type: "uuid",
					isPrimary: true,
					generationStrategy: "uuid",
					default: "uuid_generate_v4()"
				},
				{
					name: "name",
					type: "varchar",
					isNullable: false
				},
				{
					name: "height",
					type: "int",
					isNullable: false
				},
				{
					name: "width",
					type: "int",
					isNullable: false
				},
				{
					name: "length",
					type: "int",
					isNullable: false
				}
			],
			indices: [
				new TableIndex({
					name: "IDX_PRODUCTS_NAME",
					columnNames: ["name"]
				})
			]
		});

		await queryRunner.createTable(table, true);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("products");
	}

}
