/*
  Warnings:

  - You are about to drop the column `userId` on the `Doctor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[doctorId]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Doctor` DROP FOREIGN KEY `Doctor_userId_fkey`;

-- AlterTable
ALTER TABLE `Doctor` DROP COLUMN `userId`,
    ADD COLUMN `doctorId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Doctor_doctorId_key` ON `Doctor`(`doctorId`);

-- AddForeignKey
ALTER TABLE `Doctor` ADD CONSTRAINT `Doctor_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
