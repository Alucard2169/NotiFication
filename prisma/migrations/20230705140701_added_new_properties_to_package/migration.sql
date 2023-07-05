-- AlterTable
ALTER TABLE `packages` ADD COLUMN `current_version` VARCHAR(60) NULL,
    ADD COLUMN `last_date` VARCHAR(30) NULL;
