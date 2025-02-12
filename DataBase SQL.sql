
CREATE DATABASE IF NOT EXISTS `reditos_test`;
USE `reditos_test`;

CREATE TABLE IF NOT EXISTS `priority` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_9658b4dbb2043a4517d7d0e662` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Se insertan las prioridades solicitadas en el reto
INSERT INTO `priority` (`id`, `name`) VALUES
	(1, 'Alta'),
	(3, 'Baja'),
	(2, 'Media');


CREATE TABLE IF NOT EXISTS `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_95ff138b88fdd8a7c9ebdb97a3` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--Se insertan los estados solicitados en el reto
INSERT INTO `status` (`id`, `name`) VALUES
	(3, 'Completada'),
	(2, 'En progreso'),
	(1, 'Pendiente');


CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `dueDate` date NOT NULL,
  `userId` int DEFAULT NULL,
  `statusId` int DEFAULT NULL,
  `priorityId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_166bd96559cb38595d392f75a35` (`userId`),
  KEY `FK_a11f0de47a765c6c74ffbd10afa` (`statusId`),
  KEY `FK_a396efb8f415c1b4970cdea6d4f` (`priorityId`),
  CONSTRAINT `FK_166bd96559cb38595d392f75a35` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_a11f0de47a765c6c74ffbd10afa` FOREIGN KEY (`statusId`) REFERENCES `status` (`id`),
  CONSTRAINT `FK_a396efb8f415c1b4970cdea6d4f` FOREIGN KEY (`priorityId`) REFERENCES `priority` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

