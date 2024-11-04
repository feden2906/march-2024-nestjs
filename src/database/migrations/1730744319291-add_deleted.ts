import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeleted1730744319291 implements MigrationInterface {
    name = 'AddDeleted1730744319291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted"`);
    }

}
