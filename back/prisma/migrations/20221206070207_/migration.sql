/*
  Warnings:

  - A unique constraint covering the columns `[is_default]` on the table `address` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `order_coin` ADD COLUMN `stock Amount` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `address_is_default_key` ON `address`(`is_default`);
