/*
  Warnings:

  - You are about to drop the `deal_detail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `deal_detail` DROP FOREIGN KEY `deal_detail_deal_id_fkey`;

-- DropTable
DROP TABLE `deal_detail`;

-- CreateTable
CREATE TABLE `delivery_detail` (
    `id` VARCHAR(191) NOT NULL,
    `deal_id` VARCHAR(191) NOT NULL,
    `res_name` VARCHAR(191) NOT NULL,
    `res_address1` VARCHAR(191) NOT NULL,
    `res_address2` VARCHAR(191) NOT NULL,
    `res_status` ENUM('waiting', 'delivery', 'completion') NOT NULL,
    `company` VARCHAR(191) NULL,
    `delivery_number` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `delivery_detail_deal_id_key`(`deal_id`),
    INDEX `delivery_detail_deal_id_fkey`(`deal_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `delivery_detail` ADD CONSTRAINT `delivery_detail_deal_id_fkey` FOREIGN KEY (`deal_id`) REFERENCES `deal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
