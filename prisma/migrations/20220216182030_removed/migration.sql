/*
  Warnings:

  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[discord_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `discord_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `email`,
    DROP COLUMN `name`,
    ADD COLUMN `discord_id` INTEGER NOT NULL,
    ADD COLUMN `warning` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `xp` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `post`;

-- DropTable
DROP TABLE `profile`;

-- CreateIndex
CREATE UNIQUE INDEX `User_discord_id_key` ON `User`(`discord_id`);
