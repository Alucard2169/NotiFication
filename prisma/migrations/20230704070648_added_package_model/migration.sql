-- CreateTable
CREATE TABLE `packages` (
    `package_id` VARCHAR(36) NOT NULL,
    `user_id` INTEGER NULL,
    `project_name` VARCHAR(50) NULL,
    `platform` VARCHAR(50) NULL,
    `notification` BOOLEAN NULL DEFAULT false,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`package_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `packages` ADD CONSTRAINT `packages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
