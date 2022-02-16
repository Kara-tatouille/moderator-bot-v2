/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `AppUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `discord_id` INTEGER NOT NULL,
    `xp` INTEGER NOT NULL DEFAULT 0,
    `warning` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `AppUser_discord_id_key`(`discord_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
