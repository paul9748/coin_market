-- AlterTable
ALTER TABLE `analysis_detail` MODIFY `country` VARCHAR(191) NULL,
    MODIFY `currency_type` VARCHAR(191) NULL,
    MODIFY `amount` INTEGER NULL;

-- AlterTable
ALTER TABLE `country` MODIFY `exchange_rate_code` VARCHAR(191) NULL,
    MODIFY `currency_unit_name` VARCHAR(191) NULL,
    MODIFY `currency_unit_abbr` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `deal` MODIFY `image_url` VARCHAR(191) NULL;
