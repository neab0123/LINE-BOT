-- CreateTable
CREATE TABLE `hospital` (
    `hospital_id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospital_name` VARCHAR(100) NULL,

    PRIMARY KEY (`hospital_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient` (
    `patient_id` INTEGER NOT NULL AUTO_INCREMENT,
    `qr_code` VARCHAR(20) NULL,
    `fullname` VARCHAR(100) NULL,

    PRIMARY KEY (`patient_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient_user` (
    `patient_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `patient_user_patient_id_user_id_idx`(`patient_id`, `user_id`),
    INDEX `patient_user_user_id_fkey`(`user_id`),
    PRIMARY KEY (`patient_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quota` (
    `quota_id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospital_id` INTEGER NULL,
    `qty` INTEGER NULL,
    `create_date` DATETIME(0) NULL,

    PRIMARY KEY (`quota_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullname` VARCHAR(100) NULL,
    `address` VARCHAR(255) NULL,
    `mobile` VARCHAR(10) NULL,
    `line_id` VARCHAR(255) NULL,
    `shipped_status` INTEGER NULL,
    `promp_status` INTEGER NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `patient_user` ADD CONSTRAINT `patient_user_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patient`(`patient_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient_user` ADD CONSTRAINT `patient_user_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
