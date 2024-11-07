import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndex1730999450989 implements MigrationInterface {
    name = 'AddIndex1730999450989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_af90adc46c549b2a7ee83c6e44" ON "likes" ("user_id", "article_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_51b8b26ac168fbe7d6f5653e6c" ON "users" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_51b8b26ac168fbe7d6f5653e6c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_af90adc46c549b2a7ee83c6e44"`);
    }

}
