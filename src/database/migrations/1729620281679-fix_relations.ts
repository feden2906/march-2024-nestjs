import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRelations1729620281679 implements MigrationInterface {
    name = 'FixRelations1729620281679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_610102b60fea1455310ccd299de"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_eb69cbc1fa41ca7f0588749e016"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_a9d18538b896fe2a6762e143bea"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`CREATE TABLE "tags" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags_articles_articles" ("tagsId" uuid NOT NULL, "articlesId" uuid NOT NULL, CONSTRAINT "PK_4a3f3c7b50261f684e36cbc7f53" PRIMARY KEY ("tagsId", "articlesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b9cde82be45586fa8795dda71b" ON "tags_articles_articles" ("tagsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9d88b8d0e1656c425c6bfd66a9" ON "tags_articles_articles" ("articlesId") `);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "articleId"`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "article_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_3f519ed95f775c781a254089171" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_0deaa79a910af56b33472c90ee0" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_87bb15395540ae06337a486a77a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tags_articles_articles" ADD CONSTRAINT "FK_b9cde82be45586fa8795dda71b3" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tags_articles_articles" ADD CONSTRAINT "FK_9d88b8d0e1656c425c6bfd66a9d" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags_articles_articles" DROP CONSTRAINT "FK_9d88b8d0e1656c425c6bfd66a9d"`);
        await queryRunner.query(`ALTER TABLE "tags_articles_articles" DROP CONSTRAINT "FK_b9cde82be45586fa8795dda71b3"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_87bb15395540ae06337a486a77a"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_0deaa79a910af56b33472c90ee0"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_3f519ed95f775c781a254089171"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "article_id"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "articleId" uuid`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "userId" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9d88b8d0e1656c425c6bfd66a9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b9cde82be45586fa8795dda71b"`);
        await queryRunner.query(`DROP TABLE "tags_articles_articles"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_a9d18538b896fe2a6762e143bea" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_eb69cbc1fa41ca7f0588749e016" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_610102b60fea1455310ccd299de" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
