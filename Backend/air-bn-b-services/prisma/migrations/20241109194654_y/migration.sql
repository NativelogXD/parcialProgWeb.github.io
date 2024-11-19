-- CreateTable
CREATE TABLE `apartamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(255) NOT NULL,
    `descripcion` TEXT NULL,
    `ubicacion` VARCHAR(255) NULL,
    `disponibilidad` BOOLEAN NOT NULL,
    `imagen` VARCHAR(255) NULL,
    `precio` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `calificaciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apartamento_id` INTEGER NULL,
    `usuario_id` INTEGER NULL,
    `puntuacion` INTEGER NOT NULL,
    `comentario` TEXT NULL,
    `fecha_calificacion` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `apartamento_id`(`apartamento_id`),
    INDEX `usuario_id`(`usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comentarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apartamento_id` INTEGER NULL,
    `usuario_id` INTEGER NULL,
    `comentario` TEXT NOT NULL,
    `fecha_comentario` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `apartamento_id`(`apartamento_id`),
    INDEX `usuario_id`(`usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favoritos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NULL,
    `apartamento_id` INTEGER NULL,
    `fecha_agregado` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `apartamento_id`(`apartamento_id`),
    INDEX `usuario_id`(`usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imagenes_apartamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apartamento_id` INTEGER NULL,
    `url_imagen` VARCHAR(255) NOT NULL,
    `fecha_subida` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `apartamento_id`(`apartamento_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mensajes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reserva_id` INTEGER NULL,
    `remitente_id` INTEGER NULL,
    `destinatario_id` INTEGER NULL,
    `mensaje` TEXT NOT NULL,
    `fecha_mensaje` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `destinatario_id`(`destinatario_id`),
    INDEX `remitente_id`(`remitente_id`),
    INDEX `reserva_id`(`reserva_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pagos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reserva_id` INTEGER NULL,
    `monto` DECIMAL(10, 2) NOT NULL,
    `metodo_pago` ENUM('tarjeta', 'transferencia', 'paypal') NOT NULL,
    `fecha_pago` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `reserva_id`(`reserva_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `State` BOOLEAN NOT NULL,
    `user_id` INTEGER NOT NULL,
    `apartamento_id` INTEGER NOT NULL,

    INDEX `apartamento_id`(`apartamento_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ubicaciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `descripcion` TEXT NULL,
    `fecha_creacion` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `UserName` VARCHAR(255) NOT NULL,
    `Name` VARCHAR(255) NOT NULL,
    `Password` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(255) NOT NULL,
    `Phone` VARCHAR(20) NULL,

    UNIQUE INDEX `UserName`(`UserName`),
    UNIQUE INDEX `Email`(`Email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
