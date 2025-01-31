import { MigrationInterface, QueryRunner } from 'typeorm';

export class RolesAndPermissions1738319467888 implements MigrationInterface {
  name = 'RolesAndPermissions1738319467888';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "agency" ("id" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_30e185b1233a7b5a3faedd4524e" UNIQUE ("name"), CONSTRAINT "PK_ab1244724d1c216e9720635a2e5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "permission" ("id" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_240853a0c3353c25fb12434ad33" UNIQUE ("name"), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "join_role_permissions" ("role_id" uuid NOT NULL, "permission_id" uuid NOT NULL, CONSTRAINT "PK_c48d0cddf614429bfc8a9913daf" PRIMARY KEY ("role_id", "permission_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_64aa3f45a8dee2ab75890a1e04" ON "join_role_permissions" ("role_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fff6fd8d7b99efe907824b5c1e" ON "join_role_permissions" ("permission_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "join_user_roles" ("user_id" uuid NOT NULL, "role_id" uuid NOT NULL, CONSTRAINT "PK_7670a0c5b5b717a3d863d930723" PRIMARY KEY ("user_id", "role_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_844a44eb92a2f3c36588f0e300" ON "join_user_roles" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dbdcf7f3900681d9a0123eb149" ON "join_user_roles" ("role_id") `,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "agency_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_da38a07feb5a323fd8e5e3a232e" FOREIGN KEY ("agency_id") REFERENCES "agency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "join_role_permissions" ADD CONSTRAINT "FK_64aa3f45a8dee2ab75890a1e045" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "join_role_permissions" ADD CONSTRAINT "FK_fff6fd8d7b99efe907824b5c1eb" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "join_user_roles" ADD CONSTRAINT "FK_844a44eb92a2f3c36588f0e3000" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "join_user_roles" ADD CONSTRAINT "FK_dbdcf7f3900681d9a0123eb149b" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "join_user_roles" DROP CONSTRAINT "FK_dbdcf7f3900681d9a0123eb149b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "join_user_roles" DROP CONSTRAINT "FK_844a44eb92a2f3c36588f0e3000"`,
    );
    await queryRunner.query(
      `ALTER TABLE "join_role_permissions" DROP CONSTRAINT "FK_fff6fd8d7b99efe907824b5c1eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "join_role_permissions" DROP CONSTRAINT "FK_64aa3f45a8dee2ab75890a1e045"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_da38a07feb5a323fd8e5e3a232e"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "agency_id"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_dbdcf7f3900681d9a0123eb149"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_844a44eb92a2f3c36588f0e300"`,
    );
    await queryRunner.query(`DROP TABLE "join_user_roles"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fff6fd8d7b99efe907824b5c1e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_64aa3f45a8dee2ab75890a1e04"`,
    );
    await queryRunner.query(`DROP TABLE "join_role_permissions"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "permission"`);
    await queryRunner.query(`DROP TABLE "agency"`);
  }
}
