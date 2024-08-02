-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 18, 2024 at 02:55 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `exercises`
--

-- --------------------------------------------------------

--
-- Table structure for table `workouts`
--

CREATE TABLE `workouts` (
  `workout_id` int(11) NOT NULL,
  `duration` varchar(200) NOT NULL,
  `url` varchar(500) NOT NULL,
  `image` varchar(500) NOT NULL,
  `level` varchar(100) NOT NULL,
  `title` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workouts`
--

INSERT INTO `workouts` (`workout_id`, `duration`, `url`, `image`, `level`, `title`) VALUES
(1, '6 min', 'https://www.bing.com/videos/riverview/relatedvideo?q=exercise+videos&mid=E15EA82E85024019C34CE15EA82E85024019C34C&FORM=VIRE', 'https://www.bing.com/th?id=OIP.0howkQXRL0ehfAes-k1JzgHaEK&w=162&h=100&c=8&rs=1&qlt=90&o=6&dpr=1.7&pid=3.1&rm=2', 'Beginner', 'Key core exercises to gain muscles'),
(2, '6 min', 'https://www.youtube.com/watch?v=BcsyAQMLVTY', 'https://www.bing.com/th?id=OIP.CkiPMKdN3mRy2qQddgXJxQHaGa&w=114&h=100&c=8&rs=1&qlt=90&o=6&dpr=1.7&pid=3.1&rm=2', 'Beginner', 'Top 10 most common mistakes when weightlifting');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `workouts`
--
ALTER TABLE `workouts`
  ADD PRIMARY KEY (`workout_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `workouts`
--
ALTER TABLE `workouts`
  MODIFY `workout_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
