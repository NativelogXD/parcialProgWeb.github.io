/*
  Warnings:

  - Made the column `usuario_id` on table `favoritos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `apartamento_id` on table `favoritos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `favoritos` MODIFY `usuario_id` INTEGER NOT NULL,
    MODIFY `apartamento_id` INTEGER NOT NULL;
