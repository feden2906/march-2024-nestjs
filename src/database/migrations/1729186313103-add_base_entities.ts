import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseEntities1729186313103 implements MigrationInterface {
    name = 'AddBaseEntities1729186313103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`    
            CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "isActive" boolean NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
