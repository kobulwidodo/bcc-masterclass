-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 02, 2022 at 01:43 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_bccfreepass`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` smallint(6) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(150) NOT NULL,
  `create_admin_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_admin_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id_course` smallint(6) NOT NULL,
  `name` varchar(100) NOT NULL,
  `id_user` smallint(6) NOT NULL,
  `price` bigint(20) NOT NULL,
  `create_course_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_course_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id_course`, `name`, `id_user`, `price`, `create_course_time`, `update_course_time`) VALUES
(1, 'Belajar Programming', 6, 95000, '2022-02-02 09:56:42', '2022-02-02 10:21:01'),
(2, 'Design UI/UX', 6, 125000, '2022-02-02 10:01:22', '2022-02-02 10:01:22');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` smallint(6) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(150) NOT NULL,
  `role` smallint(6) NOT NULL DEFAULT 0,
  `create_users_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_users_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `username`, `email`, `password`, `role`, `create_users_time`, `update_users_time`) VALUES
(1, 'budiheru', 'budiheru@gmail.com', 'dlksjlkjdljsljljdfljlsdjlf', 0, '2022-02-02 03:20:20', '2022-02-02 04:53:16'),
(2, 'nickfury', 'nickfury@gmail.com', '$2a$10$7ot9gB4IoqNtRr5aeTgWO.91il443yCEZD5hU9.T86jXnaJm9UpOW', 0, '2022-02-02 04:10:07', '2022-02-02 04:53:16'),
(3, 'dudungyulian', 'dudungyu@gmail.com', '$2a$10$wARU4E1b4kAFmWMsx2oUXu2OkunAhpLa4YOa.LDnEFIKjqB1SH5cm', 0, '2022-02-02 04:21:51', '2022-02-02 04:53:16'),
(4, 'ririwiliam124', 'riwiliam123@gmail.com', '$2a$10$PaRw.5fFHN6UyMAzHqLeLettswCltWSygqkJvEeim/xqFHl85CwLG', 0, '2022-02-02 04:26:25', '2022-02-02 05:31:23'),
(5, 'jejekurniawan12', 'jekur@gmail.com', '$2a$10$HWxmrES7tXiKU/C0pMZC2eOVIJUwRBjehVSKGr5AQbCUY5nU.JFo2', 0, '2022-02-02 09:31:58', '2022-02-02 09:35:39'),
(6, 'huriyanjulian', 'hujul123@gmail.com', '$2a$10$AgVCvGMpOhoKffa5P3Bd4.8SNGPdIompmS/fsrn7rP18vlS0Fv1Hq', 1, '2022-02-02 09:44:32', '2022-02-02 09:44:32');

-- --------------------------------------------------------

--
-- Table structure for table `user_course`
--

CREATE TABLE `user_course` (
  `id_course` smallint(6) NOT NULL,
  `id_user` smallint(6) NOT NULL,
  `buy_course_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_course`
--

INSERT INTO `user_course` (`id_course`, `id_user`, `buy_course_time`) VALUES
(1, 5, '2022-02-02 12:27:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id_course`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `user_course`
--
ALTER TABLE `user_course`
  ADD KEY `id_course` (`id_course`),
  ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` smallint(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id_course` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Constraints for table `user_course`
--
ALTER TABLE `user_course`
  ADD CONSTRAINT `user_course_ibfk_1` FOREIGN KEY (`id_course`) REFERENCES `course` (`id_course`),
  ADD CONSTRAINT `user_course_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
