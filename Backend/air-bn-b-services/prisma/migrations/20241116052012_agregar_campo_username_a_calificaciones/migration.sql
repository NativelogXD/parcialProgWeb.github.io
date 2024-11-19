/*
  Warnings:

  - Made the column `apartamento_id` on table `comentarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `usuario_id` on table `comentarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `apartamento_id` on table `imagenes_apartamento` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descripcion` on table `ubicaciones` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `comentarios` MODIFY `apartamento_id` INTEGER NOT NULL,
    MODIFY `usuario_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `imagenes_apartamento` MODIFY `apartamento_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ubicaciones` MODIFY `descripcion` TEXT NOT NULL;
