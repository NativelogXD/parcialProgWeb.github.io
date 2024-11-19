/*
  Warnings:

  - Made the column `reserva_id` on table `pagos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `pagos` MODIFY `reserva_id` INTEGER NOT NULL;
