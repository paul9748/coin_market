/*
  Warnings:

  - Made the column `exchange_rate_code` on table `country` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currency_unit_name` on table `country` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currency_unit_abbr` on table `country` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image_url` on table `deal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `company` on table `deal_detail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `delivery_number` on table `deal_detail` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `country` MODIFY `exchange_rate_code` VARCHAR(191) NOT NULL,
    MODIFY `currency_unit_name` VARCHAR(191) NOT NULL,
    MODIFY `currency_unit_abbr` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `deal` MODIFY `image_url` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `deal_detail` MODIFY `company` VARCHAR(191) NOT NULL,
    MODIFY `delivery_number` VARCHAR(191) NOT NULL;
