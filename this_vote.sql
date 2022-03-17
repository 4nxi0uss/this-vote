-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 17 Mar 2022, 07:52
-- Wersja serwera: 10.4.21-MariaDB
-- Wersja PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `this_vote`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `login`
--

CREATE TABLE `login` (
  `id` int(16) NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `password` varchar(20) COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `login`
--

INSERT INTO `login` (`id`, `user_id`, `email`, `password`) VALUES
(10, 'a6ff932f-0da3-490d-91dd-e60876db2cc9', 'qwe@qwe.pl', '1qaz@WSX'),
(11, '236364d2-59be-4612-8ad0-4e6407da5428', 'qaz@wsx.pl', '!QAZ2wsx'),
(12, '03e47531-cc8f-4927-9857-c3bc73c305cc', 'test@test.pl', '1qaz@WSX'),
(13, '1a5bf86d-c700-4fff-94ec-4040002358d3', 'test1@test.pl', '1qaz@WSX'),
(14, 'ea5481ab-cc87-4ec2-90a5-5051585a5848', 'cxz@cxz.pl', '1qaz@WSX'),
(15, '9ab3acbe-ce46-4bb9-8415-1c6924066746', 'zxc@zxc.pl', '1qaz@WSX'),
(16, '255f8ad4-09a6-4346-9a19-ecaf8e74cba4', 'dsa@asd.pl', '1qaz@WSX');

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
(41, 'a6ff932f-0da3-490d-91dd-e60876db2cc9', 'tak2', 'tak2', 618986, '[{\"name0\": \"tak4\", \"color0\": \"#434aad\"},{\"name1\": \"tak5\", \"color1\": \"#43ad9b\"},]'),
(42, 'a6ff932f-0da3-490d-91dd-e60876db2cc9', 'dads', 'zxczxc', 585168, '[{\"name0\": \"asdasd\", \"color0\": \"#17ab92\"},{\"name1\": \"xxxxxxxxxxxxxxxx\", \"color1\": \"#ab1717\"},]'),
(43, 'a6ff932f-0da3-490d-91dd-e60876db2cc9', 'test2', 'test2', 94967, '[{\"name0\": \"test2\", \"color0\": \"#bb5d5d\"},{\"name1\": \"test4\", \"color1\": \"#5d86bb\"},]');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users_data`
--

CREATE TABLE `users_data` (
  `id` int(11) NOT NULL,
  `user_id` varchar(64) COLLATE utf8mb4_polish_ci NOT NULL,
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'John',
  `Surname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'Doe',
  `date_of_birth` date NOT NULL DEFAULT '1969-01-01',
  `type_of_account` int(3) NOT NULL DEFAULT 0,
  `active` tinyint(1) NOT NULL DEFAULT 0,
  `polls` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL DEFAULT '[]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `users_data`
--

INSERT INTO `users_data` (`id`, `user_id`, `Name`, `Surname`, `date_of_birth`, `type_of_account`, `active`, `polls`) VALUES
(1, '236364d2-59be-4612-8ad0-4e6407da5428', 'John', 'Doe', '1969-01-01', 0, 1, '[1]'),
(2, '1a5bf86d-c700-4fff-94ec-4040002358d3', 'John', 'Doe', '1969-01-01', 0, 0, '[]'),
(3, 'a6ff932f-0da3-490d-91dd-e60876db2cc9', 'John', 'DOE1522', '2021-11-26', 0, 1, '[1]'),
(15, '03e47531-cc8f-4927-9857-c3bc73c305cc', 'test4', 'test3test3', '2021-12-02', 2, 0, '[]');

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
  ADD KEY `name` (`name`(768));

--
-- Indeksy dla tabeli `users_data`
--
ALTER TABLE `users_data`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `login`
--
ALTER TABLE `login`
  MODIFY `id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT dla tabeli `polls`
--
ALTER TABLE `polls`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT dla tabeli `users_data`
--
ALTER TABLE `users_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
