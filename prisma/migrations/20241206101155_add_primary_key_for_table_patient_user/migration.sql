/*
  Warnings:

  - Made the column `patient_id` on table `patient_user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `patient_user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `patient` ADD COLUMN `fullname` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `patient_user` MODIFY `patient_id` INTEGER NOT NULL,
    MODIFY `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`patient_id`, `user_id`);

-- CreateIndex
CREATE INDEX `patient_user_patient_id_user_id_idx` ON `patient_user`(`patient_id`, `user_id`);
