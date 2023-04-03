import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class LinkGameProfileToUser1679988607139 implements MigrationInterface {
    name = 'LinkGameProfileToUser1679988607139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ADD "uid" uuid NOT NULL`);
        await queryRunner.createIndex('profile', new TableIndex({ name: 'user_profile_IDX', columnNames: ['uid' ]}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('profile', 'user_profile_IDX')
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "uid"`);
    }

}
