-- phpMyAdmin SQL Dump
-- version 5.1.3-2.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 22, 2022 at 11:11 PM
-- Server version: 10.6.5-MariaDB-log
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_cainsam`
--

-- --------------------------------------------------------

--
-- Table structure for table `Classes`
--

DROP TABLE IF EXISTS `Classes`;
CREATE TABLE `Classes` (
  `classID` int(11) NOT NULL,
  `className` varchar(45) NOT NULL,
  `classroomID` int(11) DEFAULT NULL,
  `teacherID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Classes`
--

INSERT INTO `Classes` (`classID`, `className`, `classroomID`, `teacherID`) VALUES
(1, 'Biology', 1, 3),
(2, 'Drama', 2, 1),
(3, 'PE', 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Classrooms`
--

DROP TABLE IF EXISTS `Classrooms`;
CREATE TABLE `Classrooms` (
  `classroomID` int(11) NOT NULL,
  `classroomNum` int(11) NOT NULL,
  `maxCapacity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Classrooms`
--

INSERT INTO `Classrooms` (`classroomID`, `classroomNum`, `maxCapacity`) VALUES
(1, 111, 35),
(2, 112, 20),
(3, 113, 55);

-- --------------------------------------------------------

--
-- Table structure for table `StudentClasses`
--

DROP TABLE IF EXISTS `StudentClasses`;
CREATE TABLE `StudentClasses` (
  `classID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `StudentClasses`
--

INSERT INTO `StudentClasses` (`classID`, `studentID`) VALUES
(1, 3),
(2, 2),
(3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Students`
--

DROP TABLE IF EXISTS `Students`;
CREATE TABLE `Students` (
  `studentID` int(11) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `dateOfBirth` date NOT NULL,
  `gender` varchar(45) NOT NULL,
  `streetAddressLine1` varchar(45) NOT NULL,
  `streetAddressLine2` varchar(45) DEFAULT NULL,
  `city` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  `postalCode` varchar(45) NOT NULL,
  `phoneNumber` bigint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Students`
--

INSERT INTO `Students` (`studentID`, `firstName`, `lastName`, `dateOfBirth`, `gender`, `streetAddressLine1`, `streetAddressLine2`, `city`, `state`, `postalCode`, `phoneNumber`) VALUES
(1, 'Kevin', 'Cool', '2006-03-16', 'Male', '4736 NW Coolidge Ave.', 'Suite 5', 'Clackamas', 'OR', '97083', 5038853632),
(2, 'Regina', 'Renegade', '2007-11-02', 'Female', '16745 SW Ridgeracer Rd.', NULL, 'Damascus', 'OR', '97089', 5033342343),
(3, 'Dogboy', 'Boydog', '2006-12-25', 'Male', '256 SW Goodboi Ave.', NULL, 'Clackamas', 'OR', '97076', 5037893332);

-- --------------------------------------------------------

--
-- Table structure for table `Teachers`
--

DROP TABLE IF EXISTS `Teachers`;
CREATE TABLE `Teachers` (
  `teacherID` int(11) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `dateOfBirth` date NOT NULL,
  `gender` varchar(45) NOT NULL,
  `streetAddressLine1` varchar(45) NOT NULL,
  `streetAddressLine2` varchar(45) DEFAULT NULL,
  `city` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  `postalCode` varchar(45) NOT NULL,
  `phoneNumber` bigint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Teachers`
--

INSERT INTO `Teachers` (`teacherID`, `firstName`, `lastName`, `dateOfBirth`, `gender`, `streetAddressLine1`, `streetAddressLine2`, `city`, `state`, `postalCode`, `phoneNumber`) VALUES
(1, 'Bonnie', 'Buckets', '1989-07-11', 'Female', '1758 SE Nebula Rd.', NULL, 'Damascus', 'OR', '97089', 9712238095),
(2, 'Dean', 'Domino', '1979-11-07', 'Male', '3465 SE Cabriders Dr.', 'apt. 34', 'Clackamas', 'OR', '97254', 9713448873),
(3, 'Karl', 'LaFrug', '1978-11-27', 'Male', '2435 NE Red Rider Rd.', NULL, 'Portland', 'OR', '97225', 5038023324);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Classes`
--
ALTER TABLE `Classes`
  ADD PRIMARY KEY (`classID`),
  ADD UNIQUE KEY `classID_UNIQUE` (`classID`),
  ADD KEY `classroomID_idx` (`classroomID`),
  ADD KEY `teacherID_idx` (`teacherID`);

--
-- Indexes for table `Classrooms`
--
ALTER TABLE `Classrooms`
  ADD PRIMARY KEY (`classroomID`),
  ADD UNIQUE KEY `classroomID_UNIQUE` (`classroomID`);

--
-- Indexes for table `StudentClasses`
--
ALTER TABLE `StudentClasses`
  ADD KEY `classID_idx` (`classID`),
  ADD KEY `studentID_idx` (`studentID`);

--
-- Indexes for table `Students`
--
ALTER TABLE `Students`
  ADD PRIMARY KEY (`studentID`),
  ADD UNIQUE KEY `studentID_UNIQUE` (`studentID`);

--
-- Indexes for table `Teachers`
--
ALTER TABLE `Teachers`
  ADD PRIMARY KEY (`teacherID`),
  ADD UNIQUE KEY `studentID_UNIQUE` (`teacherID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Classes`
--
ALTER TABLE `Classes`
  MODIFY `classID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Classrooms`
--
ALTER TABLE `Classrooms`
  MODIFY `classroomID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Students`
--
ALTER TABLE `Students`
  MODIFY `studentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Teachers`
--
ALTER TABLE `Teachers`
  MODIFY `teacherID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Classes`
--
ALTER TABLE `Classes`
  ADD CONSTRAINT `classroomID` FOREIGN KEY (`classroomID`) REFERENCES `Classrooms` (`classroomID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `teacherID` FOREIGN KEY (`teacherID`) REFERENCES `Teachers` (`teacherID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `StudentClasses`
--
ALTER TABLE `StudentClasses`
  ADD CONSTRAINT `classID` FOREIGN KEY (`classID`) REFERENCES `Classes` (`classID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `studentID` FOREIGN KEY (`studentID`) REFERENCES `Students` (`studentID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
