import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1716815083258 implements MigrationInterface {
    name = ' $npmConfigName1716815083258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isReal" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isReal"`);
    }

}
