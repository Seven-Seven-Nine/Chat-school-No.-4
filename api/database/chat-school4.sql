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
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Дамп данных таблицы chat-school4.chats: ~0 rows (приблизительно)

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

-- Дамп данных таблицы chat-school4.chat_participants: ~0 rows (приблизительно)

-- Дамп структуры для таблица chat-school4.messages
CREATE TABLE IF NOT EXISTS `messages` (
  `id_message` int(12) NOT NULL AUTO_INCREMENT,
  `id_chat` int(12) NOT NULL,
  `id_user` int(12) NOT NULL,
  `text` text NOT NULL DEFAULT 'none',
  `date` date NOT NULL,
  `path_to_file` varchar(250) NOT NULL DEFAULT 'none',
  `file_name` varchar(250) NOT NULL DEFAULT 'none',
  PRIMARY KEY (`id_message`) USING BTREE,
  KEY `FK_messages_users` (`id_user`),
  KEY `FK_messages_chat` (`id_chat`),
  CONSTRAINT `FK_messages_chat` FOREIGN KEY (`id_chat`) REFERENCES `chats` (`id_chat`) ON DELETE CASCADE,
  CONSTRAINT `FK_messages_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=369 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Дамп данных таблицы chat-school4.messages: ~0 rows (приблизительно)

-- Дамп структуры для таблица chat-school4.news
CREATE TABLE IF NOT EXISTS `news` (
  `id_news` int(12) NOT NULL AUTO_INCREMENT,
  `id_user` int(12) NOT NULL,
  `title` varchar(120) NOT NULL DEFAULT 'none',
  `text` text NOT NULL DEFAULT 'none',
  `date` date NOT NULL,
  PRIMARY KEY (`id_news`),
  KEY `FK_news_users` (`id_user`),
  CONSTRAINT `FK_news_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Дамп данных таблицы chat-school4.news: ~0 rows (приблизительно)

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

-- Дамп данных таблицы chat-school4.users: ~2 rows (приблизительно)
INSERT INTO `users` (`id_user`, `login`, `role`, `email`, `password`, `path_to_avatar`) VALUES
	(33, 'test', 'user', 'test@mail.ru', '$2y$12$w8qlq6R5NEPRUmqopZ80UeFhyRJe1EWw9s2gWkpsfjLRNxZ7BnpX6', 'none'),
	(62, 'admin', 'administrator', 'admin@mail.ru', '$2y$12$pzQe/PJxlYuXugIol34ToueJKaoA.j/djzh2wCirDJRgnHYRoW4Xa', 'none');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
