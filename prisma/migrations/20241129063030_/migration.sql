/*
  Warnings:

  - Made the column `hospital_id` on table `hospital` required. This step will fail if there are existing NULL values in that column.
  - Made the column `patient_id` on table `patient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quota_id` on table `quota` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `hospital` MODIFY `hospital_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`hospital_id`);

-- AlterTable
ALTER TABLE `patient` MODIFY `patient_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`patient_id`);

-- AlterTable
ALTER TABLE `quota` MODIFY `quota_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`quota_id`);

-- AlterTable
ALTER TABLE `user` MODIFY `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`user_id`);
