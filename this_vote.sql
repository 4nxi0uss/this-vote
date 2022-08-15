-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql.mikr.us
-- Czas generowania: 15 Sie 2022, 13:15
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
(1, 'a6ff932f-0da3-490d-91dd-e60876db2cc9', 'qwe@qwe.pl', '$2b$10$gqF0twSDNYK64FuX3BHJ.uEYKRjP3SQfQDMUmiy2WapZExv3/J7ai', ''),
(2, '236364d2-59be-4612-8ad0-4e6407da5428', 'qaz@wsx.pl', '$2b$10$o.v7EnNWVdv.rtx0XowyVuA4pYnFyZ3WsMORDzvl6OQ0KENQYUfSW', ''),
(3, '03e47531-cc8f-4927-9857-c3bc73c305cc', 'test@test.pl', '$2b$10$0mI33Z5YM3AqD7b7o/W/PeOV9f4BMtlC7L/Py5V3ROUZlzDwEfqn.', ''),
(4, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'cxz@cxz.pl', '$2b$10$nc6DKW3h19rLO5MK7crYI.l0KmqAxZH2vag1KT2mQjNgEx2BWZgUe', ''),
(5, '27b8dba4-04ca-4d1a-8f8b-cdd73e32b4dc', 'test@qwe.pl', '$2b$10$DGitVUMlxjAAHlY2ob7R..3VfcIwW7zdiouZDIYwpxvumbg7YXZlC', ''),
(6, 'b08c6640-7215-484f-b48a-85eeb91a0684', 'testt@test.pl', '$2b$10$EXhIzXizzTqMTBfmGexm4uV1B8YkmqNgA3rs.jV41pw4IJq7tzTii', ''),
(7, '7d2f1b45-c465-43f3-9042-ce88bbd0aa93', 'tess@tess.pl', '$2b$10$xcPhMMSR7Zl3zVHr.EYKpOXB5DN/2t7vvqa.j3DsK1vXH6mhk369W', ''),
(8, 'd5d054a7-892e-4ad4-86e3-02c4f7abfb70', 'tgv@tgb.pl', '$2b$10$PqWTg0ADUl.TPpYk3BVan.HQM/bX38LYHFlZkzuGu8E3ho0Veca4q', ''),
(9, '4729d1be-a36d-4cc3-81db-6d2ff799ab85', 'edc@edc.pl', '$2b$10$KIDJtPbHOs20QbogjttCcO4uN4BNrDDMXTQ.9961TEyRNoLic.PGm', ''),
(10, '660e2d4d-b6bf-4647-922a-73c5c38cb458', 'rfv@rfv.pl', '$2b$10$hZZjUJ0xUB4p8G16bMDUCOqWC.jW19I4eKaYvKV.Wh94hSNMepQ4u', '');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `polls`
--

CREATE TABLE `polls` (
  `id` int(8) NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `name` text COLLATE utf8mb4_polish_ci NOT NULL,
  `question` text COLLATE utf8mb4_polish_ci NOT NULL,
  `number` int(64) NOT NULL,
  `options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `polls`
--

INSERT INTO `polls` (`id`, `user_id`, `name`, `question`, `number`, `options`) VALUES
(1, 'a6ff932f-0da3-490d-91dd-e60876db2cc9', 'Text', 'Test', 135805, '{\"option0\":{\"id\":0,\"name\":\"124\",\"color\":\"#832525\",\"vote\":63},\"option1\":{\"id\":1,\"name\":\"saad\",\"color\":\"#ff0000\",\"vote\":57}}'),
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
(15, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1 2', 'question mark 3', 123896, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}'),
(16, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1 3', 'question mark 3', 122895, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}'),
(17, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1 4', 'question mark 3', 122896, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}'),
(18, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1 5', 'question mark 3', 122195, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}'),
(19, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1 6', 'question mark 3', 182194, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}'),
(20, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1 7', 'question mark 3', 182195, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}'),
(21, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1 8', 'question mark 3', 188194, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}'),
(22, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1 9', 'question mark 3', 188995, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}'),
(23, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1 10', 'question mark 3', 187999, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}'),
(25, 'a6ff932f-0da3-490d-91dd-e60876db2cc9', 'test test test', 'test test test', 141314, '{\"option0\":{\"id\":0,\"name\":\"e=test\",\"color\":\"#000000\",\"vote\":0},\"option1\":{\"id\":1,\"name\":\"asd test\",\"color\":\"#1eff00\",\"vote\":0}}'),
(26, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1 12', 'question mark 3', 166666, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}'),
(27, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'req test 1 13', 'question mark 3', 165666, '{\"option0\":{\"id\":0,\"name\":\"test1\",\"color\":\"#ab85f4\",\"vote\":6969},\"option1\":{\"id\":1,\"name\":\"test2\",\"color\":\"#e5d9a2\",\"vote\":2137}}'),
(28, 'a6ff932f-0da3-490d-91dd-e60876db2cc9', 'asd', '32ewqds', 114007, '{\"option0\":{\"id\":0,\"name\":\"3rqwdsa\",\"color\":\"#fe0101\",\"vote\":0},\"option1\":{\"id\":1,\"name\":\"arevdszx\",\"color\":\"#fe0101\",\"vote\":0}}'),
(29, 'a6ff932f-0da3-490d-91dd-e60876db2cc9', 'aerbfdzcx', '4GWERADSV', 137373, '{\"option0\":{\"id\":0,\"name\":\"AREBFDZCX\",\"color\":\"#000000\",\"vote\":0},\"option1\":{\"id\":1,\"name\":\"ATRBFDZC\",\"color\":\"#f00a0a\",\"vote\":0}}');

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
  `type_of_account` char(32) COLLATE utf8mb4_polish_ci NOT NULL DEFAULT 'User'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `users_data`
--

INSERT INTO `users_data` (`id`, `user_id`, `name`, `surname`, `date_of_birth`, `type_of_account`) VALUES
(1, '236364d2-59be-4612-8ad0-4e6407da5428', 'John', 'Doe', '1969-01-01', 'User'),
(2, 'a6ff932f-0da3-490d-91dd-e60876db2cc9', 'John', 'Doe', '2005-07-20', 'Admin'),
(3, '03e47531-cc8f-4927-9857-c3bc73c305cc', 'Tomasz', 'Tomaszewski', '2021-11-02', 'Admin'),
(4, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'Testowe 1', 'Konto', '1997-02-05', 'User'),
(5, '27b8dba4-04ca-4d1a-8f8b-cdd73e32b4dc', 'John', 'Doe', '1960-01-01', 'Editor'),
(6, 'b08c6640-7215-484f-b48a-85eeb91a0684', 'John', 'Doe', '1960-01-01', 'User'),
(7, '7d2f1b45-c465-43f3-9042-ce88bbd0aa93', 'John', 'Doe', '1960-01-01', 'User'),
(8, 'd5d054a7-892e-4ad4-86e3-02c4f7abfb70', 'John', 'Doe', '1960-01-01', 'User'),
(9, '4729d1be-a36d-4cc3-81db-6d2ff799ab85', 'John', 'Doe', '1960-01-01', 'User'),
(10, '660e2d4d-b6bf-4647-922a-73c5c38cb458', 'John', 'Doe', '1960-01-01', 'User');

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
  ADD KEY `polls_ibfk_1` (`user_id`);

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
  MODIFY `id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT dla tabeli `polls`
--
ALTER TABLE `polls`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT dla tabeli `users_data`
--
ALTER TABLE `users_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `polls`
--
ALTER TABLE `polls`
  ADD CONSTRAINT `polls_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_data` (`user_id`);

--
-- Ograniczenia dla tabeli `users_data`
--
ALTER TABLE `users_data`
  ADD CONSTRAINT `users_data_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `login` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
