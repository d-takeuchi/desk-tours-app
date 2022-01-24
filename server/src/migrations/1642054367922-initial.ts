import { MigrationInterface, QueryRunner } from 'typeorm'

export class initial1642054367922 implements MigrationInterface {
  name = 'initial1642054367922'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`password\` varchar(128) NOT NULL, \`email\` varchar(50) NOT NULL, \`icon\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`emailVerifiedAt\` datetime NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `CREATE TABLE \`likes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`postId\` int NOT NULL, \`userId\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_74b9b8cd79a1014e50135f266f\` (\`userId\`, \`postId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `CREATE TABLE \`tags\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `CREATE TABLE \`items\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`imageUrl\` varchar(255) NOT NULL, \`price\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `CREATE TABLE \`posts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`imageFileUrl\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `CREATE TABLE \`comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`postId\` int NOT NULL, \`userId\` int NOT NULL, \`comment\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `CREATE TABLE \`post_tags\` (\`postsId\` int NOT NULL, \`tagsId\` int NOT NULL, INDEX \`IDX_e989388f06246063f9af179809\` (\`postsId\`), INDEX \`IDX_03dde65485412da025858f0305\` (\`tagsId\`), PRIMARY KEY (\`postsId\`, \`tagsId\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `CREATE TABLE \`post_items\` (\`postsId\` int NOT NULL, \`itemsId\` varchar(255) NOT NULL, INDEX \`IDX_bad66e4d3c1baa126a7dfd031c\` (\`postsId\`), INDEX \`IDX_8eacf2a1132d68cd3db334c22f\` (\`itemsId\`), PRIMARY KEY (\`postsId\`, \`itemsId\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_e2fe567ad8d305fefc918d44f50\` FOREIGN KEY (\`postId\`) REFERENCES \`posts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_cfd8e81fac09d7339a32e57d904\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_ae05faaa55c866130abef6e1fee\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_e44ddaaa6d058cb4092f83ad61f\` FOREIGN KEY (\`postId\`) REFERENCES \`posts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_7e8d7c49f218ebb14314fdb3749\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE \`post_tags\` ADD CONSTRAINT \`FK_e989388f06246063f9af1798098\` FOREIGN KEY (\`postsId\`) REFERENCES \`posts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE \`post_tags\` ADD CONSTRAINT \`FK_03dde65485412da025858f03051\` FOREIGN KEY (\`tagsId\`) REFERENCES \`tags\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE \`post_items\` ADD CONSTRAINT \`FK_bad66e4d3c1baa126a7dfd031cd\` FOREIGN KEY (\`postsId\`) REFERENCES \`posts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE \`post_items\` ADD CONSTRAINT \`FK_8eacf2a1132d68cd3db334c22fc\` FOREIGN KEY (\`itemsId\`) REFERENCES \`items\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`post_items\` DROP FOREIGN KEY \`FK_8eacf2a1132d68cd3db334c22fc\``
    )
    await queryRunner.query(
      `ALTER TABLE \`post_items\` DROP FOREIGN KEY \`FK_bad66e4d3c1baa126a7dfd031cd\``
    )
    await queryRunner.query(
      `ALTER TABLE \`post_tags\` DROP FOREIGN KEY \`FK_03dde65485412da025858f03051\``
    )
    await queryRunner.query(
      `ALTER TABLE \`post_tags\` DROP FOREIGN KEY \`FK_e989388f06246063f9af1798098\``
    )
    await queryRunner.query(
      `ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_7e8d7c49f218ebb14314fdb3749\``
    )
    await queryRunner.query(
      `ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_e44ddaaa6d058cb4092f83ad61f\``
    )
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_ae05faaa55c866130abef6e1fee\``
    )
    await queryRunner.query(
      `ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_cfd8e81fac09d7339a32e57d904\``
    )
    await queryRunner.query(
      `ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_e2fe567ad8d305fefc918d44f50\``
    )
    await queryRunner.query(
      `DROP INDEX \`IDX_8eacf2a1132d68cd3db334c22f\` ON \`post_items\``
    )
    await queryRunner.query(
      `DROP INDEX \`IDX_bad66e4d3c1baa126a7dfd031c\` ON \`post_items\``
    )
    await queryRunner.query(`DROP TABLE \`post_items\``)
    await queryRunner.query(
      `DROP INDEX \`IDX_03dde65485412da025858f0305\` ON \`post_tags\``
    )
    await queryRunner.query(
      `DROP INDEX \`IDX_e989388f06246063f9af179809\` ON \`post_tags\``
    )
    await queryRunner.query(`DROP TABLE \`post_tags\``)
    await queryRunner.query(`DROP TABLE \`comments\``)
    await queryRunner.query(`DROP TABLE \`posts\``)
    await queryRunner.query(`DROP TABLE \`items\``)
    await queryRunner.query(`DROP TABLE \`tags\``)
    await queryRunner.query(
      `DROP INDEX \`IDX_74b9b8cd79a1014e50135f266f\` ON \`likes\``
    )
    await queryRunner.query(`DROP TABLE \`likes\``)
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``
    )
    await queryRunner.query(`DROP TABLE \`user\``)
  }
}
