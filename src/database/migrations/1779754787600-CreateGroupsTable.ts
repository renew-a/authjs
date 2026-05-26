import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGroupsTable1779754787600 implements MigrationInterface {
  name = 'CreateGroupsTable1779754787600';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tenants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firebaseTenantId" character varying NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d47aff9f1084edda0499647d3b0" UNIQUE ("firebaseTenantId"), CONSTRAINT "UQ_32731f181236a46182a38c992a8" UNIQUE ("name"), CONSTRAINT "UQ_2310ecc5cb8be427097154b18fc" UNIQUE ("slug"), CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_664ea405ae2a10c264d582ee563" UNIQUE ("name"), CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "firebaseUid" character varying, "firebaseTenantId" character varying NOT NULL, "tenantId" uuid NOT NULL, "username" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'USER', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_7346b08032078107fce81e014f" ON "users"  ("email", "tenantId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_groups" ("usersId" uuid NOT NULL, "groupsId" uuid NOT NULL, CONSTRAINT "PK_e8957e0d8605411be303ad2b115" PRIMARY KEY ("usersId", "groupsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b184a9372d30d296d40638f8a8" ON "user_groups"  ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_283e36ff3f2c3afe7e3488ac3e" ON "user_groups"  ("groupsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_c58f7e88c286e5e3478960a998b" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_groups" ADD CONSTRAINT "FK_b184a9372d30d296d40638f8a8e" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_groups" ADD CONSTRAINT "FK_283e36ff3f2c3afe7e3488ac3eb" FOREIGN KEY ("groupsId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_groups" DROP CONSTRAINT "FK_283e36ff3f2c3afe7e3488ac3eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_groups" DROP CONSTRAINT "FK_b184a9372d30d296d40638f8a8e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_c58f7e88c286e5e3478960a998b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_283e36ff3f2c3afe7e3488ac3e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b184a9372d30d296d40638f8a8"`,
    );
    await queryRunner.query(`DROP TABLE "user_groups"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7346b08032078107fce81e014f"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "groups"`);
    await queryRunner.query(`DROP TABLE "tenants"`);
  }
}
