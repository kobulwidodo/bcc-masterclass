-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 01, 2022 at 04:31 PM
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
  `create_admin_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id_course` smallint(6) NOT NULL,
  `name` varchar(100) NOT NULL,
  `id_user` smallint(6) NOT NULL,
  `create_course_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `create_users_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_course`
--

CREATE TABLE `user_course` (
  `id_course` smallint(6) NOT NULL,
  `id_user` smallint(6) NOT NULL,
  `buy_course` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  MODIFY `id_course` smallint(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` smallint(6) NOT NULL AUTO_INCREMENT;

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
