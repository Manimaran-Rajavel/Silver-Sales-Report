-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2023 at 08:19 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `silver_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin', 'Admin@123');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `mob_no` varchar(15) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `mob_no`, `address`) VALUES
(1, 'Mahesh', '67656654342', 'Salem'),
(2, 'Suresh', '7879779898', 'Tiruchengode'),
(4, 'Harish', '7867889091', 'Namakkal');

-- --------------------------------------------------------

--
-- Table structure for table `details_table`
--

CREATE TABLE `details_table` (
  `id` int(11) NOT NULL,
  `token_no` varchar(10) DEFAULT NULL,
  `fst_name` varchar(100) DEFAULT NULL,
  `sec_name` varchar(100) DEFAULT NULL,
  `items` varchar(255) DEFAULT NULL,
  `item_disc` varchar(300) DEFAULT NULL,
  `touch` varchar(10) DEFAULT NULL,
  `true_touch` varchar(20) DEFAULT NULL,
  `date` varchar(10) DEFAULT NULL,
  `wight` varchar(10) DEFAULT NULL,
  `mark` varchar(50) DEFAULT NULL,
  `sts` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `details_table`
--

INSERT INTO `details_table` (`id`, `token_no`, `fst_name`, `sec_name`, `items`, `item_disc`, `touch`, `true_touch`, `date`, `wight`, `mark`, `sts`) VALUES
(1, '0001', 'Mahesh', 're', 'Ring', '', '30.23', '30.23', '2023-06-16', '12', 'Yes marked', 'D'),
(2, '0002', 'Suresh', 're', 'Bracelete', '', '21.20', '21.20', '2023-06-16', '22', '', 'ND'),
(3, '0001A', 'Mahesh', 'E', 'Ring', 'ring discript', '31.25', '30.23', '2023-06-16', '12', 'Yes marked', 'D'),
(4, '0003', 'Harish', 'm', 'Nickless', 'discription for nickless', '11.06', '11.06', '2023-06-16', '23', '', 'ND'),
(9, '0004', '', '', '', '', '00.00', '00.00', '2023-06-16', '', '', 'ND'),
(12, '0006', 'Harish', 'Titmdes=discription for bracelete', 'Bracelete', NULL, '25.45', '25.45', '2023-06-16', '23', 'Yes Marked', 'D'),
(13, '0005D', 'maran', '', '', '', '00.00', '00.00', '2023-06-16', '', '', 'ND'),
(14, '0007', '', '', '', '', '00.00', '00.00', '2023-06-16', '', '', 'ND'),
(15, '0004', '', '', '', '', '00.00', '00.00', '2023-06-16', '', '', 'ND');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `itm_code` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `itm_code`, `name`) VALUES
(1, 1, 'Ring'),
(2, 2, 'Bracelete'),
(3, 3, 'Nickless'),
(4, 4, 'Bangle');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `details_table`
--
ALTER TABLE `details_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `details_table`
--
ALTER TABLE `details_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
