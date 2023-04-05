import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAvatarFieldToProfile1680728162973 implements MigrationInterface {
    name = 'AddAvatarFieldToProfile1680728162973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ADD "avatar" character varying(140) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "avatar"`);
    }

}
