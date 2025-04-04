-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Апр 04 2025 г., 13:28
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `chat-school-4`
--

-- --------------------------------------------------------

--
-- Структура таблицы `news`
--

CREATE TABLE `news` (
  `id_news` int(12) NOT NULL,
  `id_user` int(12) NOT NULL COMMENT 'ID пользователя, создавшего новость',
  `title` varchar(120) NOT NULL COMMENT 'Заголовок новости',
  `date` date NOT NULL COMMENT 'Дата создания новости',
  `text` text NOT NULL COMMENT 'Текст новости'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `news`
--

INSERT INTO `news` (`id_news`, `id_user`, `title`, `date`, `text`) VALUES
(7, 1, 'Тестовая новость 1', '2025-03-30', '<p>Текст тестовой новости 1.</p>\r\n\r\n<p>Второй абзац тестовой новости 1.</p>'),
(8, 1, 'Тестовая новость 2', '2025-03-30', '<p>Текст тестовой новости 2.</p>\r\n\r\n<p>Второй абзац тестовой новости 2.</p>'),
(9, 1, 'Тестовая новость 3', '2025-03-30', '<p>Текст тестовой новости 3.</p>\r\n\r\n<p>Второй абзац тестовой новости 3.</p>'),
(14, 1, 'Большая текстовая новость', '2025-04-04', '<p>Большая текстовая новость.</p>\r\n\r\n<p>Я серьёзно, это очень большая текстовая новость.</p>\r\n\r\n<p>Даже не пытайся её читать, ты умрёшь от старости! Или от спида. Или от брюшного тифа.</p>\r\n\r\n<p>Хватит читать! Читать вредно для тупых, вдруг они поумнеют!</p>\r\n<p>Остановись...</p>\r\n\r\n<p><b>You don\'t puss me!</p>\r\n\r\n<p>Press F to respect! Press F to respect! Press F to respect!</b></p>'),
(15, 1, 'Теги', '2025-04-04', '<p>Текст</p>\r\n<h3>Заголовок третьего уровня</h3>\r\n<p><b>Жирный текст!</b> Прям как ты.</p>');

-- --------------------------------------------------------

--
-- Структура таблицы `updates`
--

CREATE TABLE `updates` (
  `id_update` int(12) NOT NULL,
  `id_user` int(12) NOT NULL COMMENT 'ID пользователя, опубликовавшего',
  `title` varchar(50) NOT NULL DEFAULT 'Updates | Hot-fix' COMMENT 'Заголовок',
  `date` date NOT NULL COMMENT 'Дата создания списка обновления',
  `text` text NOT NULL COMMENT 'Список обновлений'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `updates`
--

INSERT INTO `updates` (`id_update`, `id_user`, `title`, `date`, `text`) VALUES
(4, 1, 'Updates | Hot-fix', '2025-03-30', '<ul>\r\n<li>Изменено вот это.</li>\r\n<li>Добавлено вот это.</li>\r\n<li>Удалено вот это.</li>\r\n</ul>');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id_user` int(12) NOT NULL,
  `login` varchar(50) NOT NULL COMMENT 'Логин пользователя',
  `role` varchar(20) NOT NULL DEFAULT 'user' COMMENT 'Роль пользователя',
  `email` varchar(50) NOT NULL COMMENT 'Почта пользователя',
  `password` varchar(120) NOT NULL COMMENT 'Пароль пользователя',
  `path_to_image` varchar(120) NOT NULL DEFAULT 'null' COMMENT 'Изображение пользователя',
  `token` varchar(120) NOT NULL COMMENT 'Токен пользователя'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id_user`, `login`, `role`, `email`, `password`, `path_to_image`, `token`) VALUES
(1, 'admin', 'administrator', 'admin@mail.ru', '$2y$10$IwZbfwIfsRVTRwWrI528eOngo7QisbCGpRyfnFS2NG2A8alcPid0G', '/user_images/devushka_krolik_schaste_206996_1920x1200.jpg', '6fd79423b876a74d6ae2de3d482a48eb'),
(3, 'test', 'user', 'test@mail.ru', '$2y$10$cmp75TItO4zxe.o0GlW4Pu926yld/8atArH6bcUoNQYS33b.y41Ue', '/user_images/malchik_ulybka_sobaka_1006791_1920x1080.jpg', '405d0cf6f2ddd0a36fa8bfa69bae95a2');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id_news`),
  ADD KEY `id_user` (`id_user`);

--
-- Индексы таблицы `updates`
--
ALTER TABLE `updates`
  ADD PRIMARY KEY (`id_update`),
  ADD KEY `id_user` (`id_user`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `news`
--
ALTER TABLE `news`
  MODIFY `id_news` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `updates`
--
ALTER TABLE `updates`
  MODIFY `id_update` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Ограничения внешнего ключа таблицы `updates`
--
ALTER TABLE `updates`
  ADD CONSTRAINT `updates_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
