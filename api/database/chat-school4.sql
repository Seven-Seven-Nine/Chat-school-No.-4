-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               11.7.2-MariaDB - mariadb.org binary distribution
-- Операционная система:         Win64
-- HeidiSQL Версия:              12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Дамп структуры базы данных chat-school4
CREATE DATABASE IF NOT EXISTS `chat-school4` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `chat-school4`;

-- Дамп структуры для таблица chat-school4.chats
CREATE TABLE IF NOT EXISTS `chats` (
  `id_chat` int(12) NOT NULL AUTO_INCREMENT,
  `id_user` int(12) NOT NULL,
  `title` varchar(50) NOT NULL,
  `path_to_image` varchar(120) NOT NULL,
  PRIMARY KEY (`id_chat`),
  KEY `FK_chat_users` (`id_user`),
  CONSTRAINT `FK_chat_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Дамп данных таблицы chat-school4.chats: ~2 rows (приблизительно)
INSERT INTO `chats` (`id_chat`, `id_user`, `title`, `path_to_image`) VALUES
	(50, 33, 'Тестовый чат 1', '/api/chat-image/684fb20a88b49_bukva-Y.jpg'),
	(51, 33, 'Тестовый чат 2', '/api/chat-image/684fb216c8da4_bukva-Y.jpg');

-- Дамп структуры для таблица chat-school4.chat_participants
CREATE TABLE IF NOT EXISTS `chat_participants` (
  `id_chat` int(12) NOT NULL,
  `id_user` int(12) NOT NULL,
  `joined_at` date NOT NULL,
  KEY `FK_chat_participants_chat` (`id_chat`),
  KEY `FK_chat_participants_users` (`id_user`),
  CONSTRAINT `FK_chat_participants_chat` FOREIGN KEY (`id_chat`) REFERENCES `chats` (`id_chat`) ON DELETE CASCADE,
  CONSTRAINT `FK_chat_participants_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Дамп данных таблицы chat-school4.chat_participants: ~4 rows (приблизительно)
INSERT INTO `chat_participants` (`id_chat`, `id_user`, `joined_at`) VALUES
	(50, 33, '2025-06-16'),
	(51, 33, '2025-06-16'),
	(50, 62, '2025-06-16'),
	(51, 62, '2025-06-16');

-- Дамп структуры для таблица chat-school4.messages
CREATE TABLE IF NOT EXISTS `messages` (
  `id_message` int(12) NOT NULL AUTO_INCREMENT,
  `id_chat` int(12) NOT NULL,
  `id_user` int(12) NOT NULL,
  `text` text NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id_message`) USING BTREE,
  KEY `FK_messages_users` (`id_user`),
  KEY `FK_messages_chat` (`id_chat`),
  CONSTRAINT `FK_messages_chat` FOREIGN KEY (`id_chat`) REFERENCES `chats` (`id_chat`) ON DELETE CASCADE,
  CONSTRAINT `FK_messages_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Дамп данных таблицы chat-school4.messages: ~5 rows (приблизительно)
INSERT INTO `messages` (`id_message`, `id_chat`, `id_user`, `text`, `date`) VALUES
	(37, 50, 33, 'Первое сообщение тестового чата 1.', '2025-06-16'),
	(38, 51, 33, 'Первое сообщение тестового чата 2.', '2025-06-16'),
	(39, 50, 62, 'Второе сообщение тестового чата 1.', '2025-06-16'),
	(40, 51, 62, 'Второе сообщение тестового чата 2.', '2025-06-16'),
	(41, 50, 62, 'Третье сообщение тестового чата 1.', '2025-06-16');

-- Дамп структуры для таблица chat-school4.users
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int(12) NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'user',
  `email` varchar(75) NOT NULL,
  `password` varchar(120) NOT NULL,
  `path_to_avatar` varchar(244) NOT NULL DEFAULT 'none',
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `UNIQUE` (`login`,`email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Дамп данных таблицы chat-school4.users: ~6 rows (приблизительно)
INSERT INTO `users` (`id_user`, `login`, `role`, `email`, `password`, `path_to_avatar`) VALUES
	(33, 'test', 'user', 'test@mail.ru', '$2y$12$w8qlq6R5NEPRUmqopZ80UeFhyRJe1EWw9s2gWkpsfjLRNxZ7BnpX6', '/api/user-image/684d2d6bc54d6_vibrant-landscape-3840x2160-17436.jpg'),
	(58, 'test1', 'user', 'test1@mail.ru', '$2y$12$FStDTYvqLp5Dp/s1YxK2fuGsr.IU204v/QuUGeW0WBVHh4sV6moL6', 'none'),
	(61, 'test3', 'user', 'test3@mail.ru', '$2y$12$FStDTYvqLp5Dp/s1YxK2fuGsr.IU204v/QuUGeW0WBVHh4sV6moL6', 'none'),
	(62, 'admin', 'administrator', 'admin@mail.ru', '$2y$12$pzQe/PJxlYuXugIol34ToueJKaoA.j/djzh2wCirDJRgnHYRoW4Xa', '/api/user-image/684c163ebbf2e_Снимок экрана 2025-05-11 214210.png'),
	(63, 'test2', 'user', 'test2@mail.ru', '$2y$12$FStDTYvqLp5Dp/s1YxK2fuGsr.IU204v/QuUGeW0WBVHh4sV6moL6', 'none'),
	(64, 'test4', 'user', 'test4@mail.ru', '$2y$12$FStDTYvqLp5Dp/s1YxK2fuGsr.IU204v/QuUGeW0WBVHh4sV6moL6', 'none');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
