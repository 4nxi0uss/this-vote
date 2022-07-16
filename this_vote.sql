-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql.mikr.us
-- Czas generowania: 15 Lip 2022, 09:57
-- Wersja serwera: 10.3.29-MariaDB-0ubuntu0.20.04.1-log
-- Wersja PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `db_h250`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `login`
--

CREATE TABLE `login` (
  `id` int(16) NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `password` varchar(64) COLLATE utf8mb4_polish_ci NOT NULL,
  `refresh_token` varchar(512) COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `login`
--

INSERT INTO `login` (`id`, `user_id`, `email`, `password`, `refresh_token`) VALUES
(1, 'a6ff932f-0da3-490d-91dd-e60876db2cc9', 'qwe@qwe.pl', '$2b$10$gqF0twSDNYK64FuX3BHJ.uEYKRjP3SQfQDMUmiy2WapZExv3/J7ai', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiTG9nZ2VkLiIsImxvZ2luIjp0cnVlLCJyb3dzIjpbeyJpZCI6MSwidXNlcl9pZCI6ImE2ZmY5MzJmLTBkYTMtNDkwZC05MWRkLWU2MDg3NmRiMmNjOSJ9XSwiaWF0IjoxNjU3ODMzNzc5LCJleHAiOjE2NTc5MjAxNzl9.UEBbNuw-USohodPUeur1ntbo-cWXzjf8WL-Tz0dTBuc'),
(2, '236364d2-59be-4612-8ad0-4e6407da5428', 'qaz@wsx.pl', '$2b$10$o.v7EnNWVdv.rtx0XowyVuA4pYnFyZ3WsMORDzvl6OQ0KENQYUfSW', ''),
(3, '03e47531-cc8f-4927-9857-c3bc73c305cc', 'test@test.pl', '$2b$10$0mI33Z5YM3AqD7b7o/W/PeOV9f4BMtlC7L/Py5V3ROUZlzDwEfqn.', ''),
(4, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'cxz@cxz.pl', '$2b$10$nc6DKW3h19rLO5MK7crYI.l0KmqAxZH2vag1KT2mQjNgEx2BWZgUe', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiTG9nZ2VkLiIsImxvZ2luIjp0cnVlLCJyb3dzIjpbeyJpZCI6NCwidXNlcl9pZCI6ImVhNTQ4MWFiLWNjODctNGVjMi05MGE1LTUwNTE1ODVhNTg0OCJ9XSwiaWF0IjoxNjU3NzQ1MDAxLCJleHAiOjE2NTc4MzE0MDF9.3iC9n_0DGaF76iXLqfzGar9H4opl-Ybv_GcFLlBZ4io'),
(5, '27b8dba4-04ca-4d1a-8f8b-cdd73e32b4dc', 'test@qwe.pl', '$2b$10$DGitVUMlxjAAHlY2ob7R..3VfcIwW7zdiouZDIYwpxvumbg7YXZlC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiTG9nZ2VkLiIsImxvZ2luIjp0cnVlLCJyb3dzIjpbeyJpZCI6NSwidXNlcl9pZCI6IjI3YjhkYmE0LTA0Y2EtNGQxYS04ZjhiLWNkZDczZTMyYjRkYyJ9XSwiaWF0IjoxNjU3NDg2OTU4LCJleHAiOjE2NTc1NzMzNTh9.kt8Uh5P8a5fi1RVbExZZZgzm40kAhMUrR5pzb7MtRFQ');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `polls`
--

CREATE TABLE `polls` (
  `id` int(8) NOT NULL,
  `creator_id` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `name` text COLLATE utf8mb4_polish_ci NOT NULL,
  `question` text COLLATE utf8mb4_polish_ci NOT NULL,
  `number` int(64) NOT NULL,
  `options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `polls`
--

INSERT INTO `polls` (`id`, `creator_id`, `name`, `question`, `number`, `options`) VALUES
(1, 'a6ff932f-0da3-490d-91dd-e60876db2cc9', 'Text', 'Test', 135805, '{\"option0\":{\"id\":0,\"name\":\"12$\",\"color\":\"#832525\",\"vote\":62},\"option1\":{\"id\":1,\"name\":\"saad\",\"color\":\"#ff0000\",\"vote\":54}}'),
(2, 'a6ff932f-0da3-490d-91dd-e60876db2cc9', 'Proba 11', 'testowe pyttanie 1', 197546, '{\"option0\":{\"id\":0,\"name\":\"opcja1\",\"color\":\"#ff9494\",\"vote\":8},\"option1\":{\"id\":1,\"name\":\"opcja2\",\"color\":\"#e63333\",\"vote\":8},\"option2\":{\"id\":2,\"name\":\"opcja3\",\"color\":\"#e63333\",\"vote\":6},\"option3\":{\"id\":3,\"name\":\"opcja 5\",\"color\":\"#3f33e6\",\"vote\":11},\"option4\":{\"id\":4,\"name\":\"opcja4\",\"color\":\"#33e6b9\",\"vote\":11},\"option5\":{\"id\":5,\"name\":\"opcja6\",\"color\":\"#5ae633\",\"vote\":9}}'),
(3, 'a6ff932f-0da3-490d-91dd-e60876db2cc9', 'proba3 5', '333', 181476, '{\"option0\":{\"id\":0,\"name\":\"j\",\"color\":\"#000000\",\"vote\":16},\"option1\":{\"id\":1,\"name\":\"ertyu\",\"color\":\"#ff0000\",\"vote\":13},\"option2\":{\"id\":2,\"name\":\"kjhgfdxz\",\"color\":\"#bb00ff\",\"vote\":12}}'),
(4, '03e47531-cc8f-4927-9857-c3bc73c305cc', 'qwe', 'dsa', 164199, '{\"option0\":{\"id\":0,\"name\":\"412\",\"color\":\"#000000\",\"vote\":0},\"option1\":{\"id\":1,\"name\":\"cxz\",\"color\":\"#893e3e\",\"vote\":0}}'),
(5, '03e47531-cc8f-4927-9857-c3bc73c305cc', 'sdf', 'zxcv', 173888, '{\"option0\":{\"id\":0,\"name\":\"zxv\",\"color\":\"#d400ff\",\"vote\":1},\"option1\":{\"id\":1,\"name\":\"vvcx\",\"color\":\"#59ff00\",\"vote\":2}}'),
(6, '03e47531-cc8f-4927-9857-c3bc73c305cc', 'asd', 'rweq', 106431, '{\"option0\":{\"id\":0,\"name\":\"qw\",\"color\":\"#000000\",\"vote\":1},\"option1\":{\"id\":1,\"name\":\"zxcb\",\"color\":\"#bd2828\",\"vote\":1},\"option2\":{\"id\":2,\"name\":\"vxgsd\",\"color\":\"#2846bd\",\"vote\":1}}'),
(7, '03e47531-cc8f-4927-9857-c3bc73c305cc', 'iuadsfb', 'pdkgs', 188884, '{\"option0\":{\"id\":0,\"name\":\"osjdf\",\"color\":\"#2846bd\",\"vote\":2},\"option1\":{\"id\":1,\"name\":\"dytgf\",\"color\":\"#28bd98\",\"vote\":2},\"option2\":{\"id\":2,\"name\":\"dhmgdfbv\",\"color\":\"#37ff00\",\"vote\":2}}'),
(8, 'a6ff932f-0da3-490d-91dd-e60876db2cc9', 'big GJ', 'tests', 190938, '{\"option0\":{\"id\":0,\"name\":\"of\",\"color\":\"#000000\",\"vote\":10},\"option1\":{\"id\":1,\"name\":\"#4\",\"color\":\"#ff0000\",\"vote\":9},\"option2\":{\"id\":2,\"name\":\"test22\",\"color\":\"#44ff00\",\"vote\":3}}'),
(9, 'a6ff932f-0da3-490d-91dd-e60876db2cc9', 'qwe', 'dsa', 133922, '{\"option0\":{\"id\":0,\"name\":\"qwas\",\"color\":\"#000000\",\"vote\":0},\"option1\":{\"id\":1,\"name\":\"awdsv\",\"color\":\"#ff0000\",\"vote\":0}}'),
(10, 'a6ff932f-0da3-490d-91dd-e60876db2cc9', 'tesciwo', 'tesciwo', 142542, '{\"option0\":{\"id\":0,\"name\":\"tesc\",\"color\":\"#000000\",\"vote\":0},\"option1\":{\"id\":1,\"name\":\"iwo\",\"color\":\"#ff0000\",\"vote\":0}}'),
(11, 'a6ff932f-0da3-490d-91dd-e60876db2cc9', 'ewrdsf', 'wefds', 184473, '{\"option0\":{\"id\":0,\"name\":\"wqdas\",\"color\":\"#000000\",\"vote\":0},\"option1\":{\"id\":1,\"name\":\"wqeads\",\"color\":\"#ff0000\",\"vote\":0}}'),
(12, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req_test-1', 'question_mark', 123456, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#832525\",\"vote\":60},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#f27302\",\"vote\":51}}'),
(13, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'reqtest1', 'questionmark', 123465, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#764928\",\"vote\":866},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#8a2d9c\",\"vote\":945}}'),
(14, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1', 'question mark 3', 123895, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2138}}'),
(15, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1', 'question mark 3', 123896, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}'),
(16, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1', 'question mark 3', 122895, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}'),
(17, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1', 'question mark 3', 122896, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}'),
(18, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1', 'question mark 3', 122195, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}'),
(19, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1', 'question mark 3', 182194, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}'),
(20, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1', 'question mark 3', 182195, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}'),
(21, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1', 'question mark 3', 188194, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}'),
(22, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1', 'question mark 3', 188995, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}'),
(23, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1', 'question mark 3', 187999, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}'),
(24, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1', 'question mark 3', 187699, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}'),
(25, 'a6ff932f-0da3-490d-91dd-e60876db2cc9', 'test test test', 'test test test', 141314, '{\"option0\":{\"id\":0,\"name\":\"e=test\",\"color\":\"#000000\",\"vote\":0},\"option1\":{\"id\":1,\"name\":\"asd test\",\"color\":\"#1eff00\",\"vote\":0}}'),
(26, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1', 'question mark 3', 166666, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}'),
(27, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1', 'question mark 3', 165666, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users_data`
--

CREATE TABLE `users_data` (
  `id` int(11) NOT NULL,
  `user_id` varchar(64) COLLATE utf8mb4_polish_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'John',
  `surname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'Doe',
  `date_of_birth` date NOT NULL DEFAULT '1960-01-01',
  `type_of_account` int(3) NOT NULL DEFAULT 0,
  `active` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `users_data`
--

INSERT INTO `users_data` (`id`, `user_id`, `name`, `surname`, `date_of_birth`, `type_of_account`, `active`) VALUES
(1, '236364d2-59be-4612-8ad0-4e6407da5428', 'John', 'Doe', '1969-01-01', 0, 1),
(2, 'a6ff932f-0da3-490d-91dd-e60876db2cc9', 'John', 'DOE1522', '2021-11-16', 0, 1),
(3, '03e47531-cc8f-4927-9857-c3bc73c305cc', 'Tomasz', 'Tomaszewski', '2021-11-02', 2, 1),
(4, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'Testowe 1', 'Konto', '1997-02-05', 0, 1),
(5, '27b8dba4-04ca-4d1a-8f8b-cdd73e32b4dc', 'John', 'Doe', '1960-01-01', 0, 1);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `email` (`email`) USING BTREE;

--
-- Indeksy dla tabeli `polls`
--
ALTER TABLE `polls`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name` (`name`(768)),
  ADD KEY `polls_ibfk_1` (`creator_id`);

--
-- Indeksy dla tabeli `users_data`
--
ALTER TABLE `users_data`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `login`
--
ALTER TABLE `login`
  MODIFY `id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT dla tabeli `polls`
--
ALTER TABLE `polls`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT dla tabeli `users_data`
--
ALTER TABLE `users_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `polls`
--
ALTER TABLE `polls`
  ADD CONSTRAINT `polls_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `users_data` (`user_id`);

--
-- Ograniczenia dla tabeli `users_data`
--
ALTER TABLE `users_data`
  ADD CONSTRAINT `users_data_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `login` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
