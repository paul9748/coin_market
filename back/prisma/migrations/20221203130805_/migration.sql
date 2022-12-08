/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `nick_name` on the `user` table. All the data in the column will be lost.
  - Added the required column `isActivate` to the `deal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `coin` ADD COLUMN `dealAmount` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `deal` ADD COLUMN `isActivate` TINYINT NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `name`,
    DROP COLUMN `nick_name`,
    ADD COLUMN `userName` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('admin', 'user', 'withdrawal') NOT NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE `user_token` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_token_user_id_key`(`user_id`),
    UNIQUE INDEX `user_token_refresh_token_key`(`refresh_token`),
    INDEX `user_token_user_id_fkey`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_token` ADD CONSTRAINT `user_token_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
