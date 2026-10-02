-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 14, 2026 at 04:21 PM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rifledate`
--

-- --------------------------------------------------------

--
-- Table structure for table `firearms`
--

CREATE TABLE `firearms` (
  `Firearm_Name` varchar(50) NOT NULL,
  `Country` varchar(50) NOT NULL,
  `Website` text NOT NULL,
  `Firearm_ID` int(11) NOT NULL,
  `picture` varchar(255) DEFAULT 'default.png',
  `IsReady` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `firearms`
--

INSERT INTO `firearms` (`Firearm_Name`, `Country`, `Website`, `Firearm_ID`, `picture`, `IsReady`) VALUES
('Krag Jorgensen', 'USA', 'https://surplused.com/index.php/2014/05/29/a-quick-and-dirty-guide-military-krag-jorgensen-rifles/', 5, 'Krag_jorgensen.jpg', 1),
('M1 Carbine', 'USA', '', 9, 'newM1Carbine.jpg', 1),
('M1 Garand', 'USA', '', 10, 'M1_Garand_Image.jpg', 1),
('Carcano', 'Italy', '', 11, 'carcano.jpg', 1),
('Mosin Nagant', 'USSR', '', 15, 'Mosin_Nagant.png', 1),
('Arisaka', 'Japan', 'fads', 22, 'Arisaka.jpg', 0),
('dsA\'', 'DSa', 'dsa', 24, 'Krag_jorgensen.jpg', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `firearms`
--
ALTER TABLE `firearms`
  ADD PRIMARY KEY (`Firearm_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `firearms`
--
ALTER TABLE `firearms`
  MODIFY `Firearm_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
