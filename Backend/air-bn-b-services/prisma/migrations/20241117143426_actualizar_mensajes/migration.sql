/*
  Warnings:

  - You are about to drop the column `reserva_id` on the `mensajes` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `reserva_id` ON `mensajes`;

-- AlterTable
ALTER TABLE `mensajes` DROP COLUMN `reserva_id`;

-- AddForeignKey
ALTER TABLE `mensajes` ADD CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`remitente_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `mensajes` ADD CONSTRAINT `mensajes_ibfk_2` FOREIGN KEY (`destinatario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
