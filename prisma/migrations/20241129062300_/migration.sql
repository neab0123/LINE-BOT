-- CreateTable
CREATE TABLE `hospital` (
    `hospital_id` INTEGER NULL,
    `hospital_name` VARCHAR(100) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient` (
    `patient_id` INTEGER NULL,
    `qr_code` VARCHAR(20) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient_user` (
    `patient_id` INTEGER NULL,
    `user_id` INTEGER NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quota` (
    `quota_id` INTEGER NULL,
    `hospital_id` INTEGER NULL,
    `qty` INTEGER NULL,
    `create_date` DATETIME(0) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NULL,
    `fullname` VARCHAR(100) NULL,
    `address` VARCHAR(255) NULL,
    `mobile` VARCHAR(10) NULL,
    `line_id` VARCHAR(255) NULL,
    `shipped_status` INTEGER NULL,
    `promp_status` INTEGER NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
