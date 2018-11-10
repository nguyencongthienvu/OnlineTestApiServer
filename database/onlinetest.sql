-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th7 22, 2018 lúc 01:56 PM
-- Phiên bản máy phục vụ: 5.7.19
-- Phiên bản PHP: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `onlinetest`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `course`
--

DROP TABLE IF EXISTS `course`;
CREATE TABLE IF NOT EXISTS `course` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `ccode` varchar(255) NOT NULL,
  `mcode` varchar(255) NOT NULL,
  `mname` varchar(255) NOT NULL,
  `cname` varchar(255) NOT NULL,
  `ects` int(11) DEFAULT NULL,
  `year` varchar(5) DEFAULT NULL,
  `sem` varchar(5) DEFAULT NULL,
  `deptid` int(11) NOT NULL,
  PRIMARY KEY (`cid`),
  UNIQUE KEY `ccode` (`ccode`),
  KEY `CourseForeignKey` (`deptid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `course`
--

INSERT INTO `course` (`cid`, `ccode`, `mcode`, `mname`, `cname`, `ects`, `year`, `sem`, `deptid`) VALUES
(1, 'LTCB311', '17011043', 'Lap Trinh', 'Lap Trinh Can Bản', 3, 'II', '2', 1),
(2, 'TD121', '2562255', 'Trac Dia', 'Trac Dia 1', NULL, NULL, NULL, 11),
(4, 'LTNC311', '17011043	', 'Lap Trinh', 'Lap Trinh Nang Cao', 0, '1', '1', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `department`
--

DROP TABLE IF EXISTS `department`;
CREATE TABLE IF NOT EXISTS `department` (
  `deptid` int(11) NOT NULL AUTO_INCREMENT,
  `dept` varchar(255) NOT NULL,
  `dept_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_mysql500_ci NOT NULL,
  PRIMARY KEY (`deptid`),
  UNIQUE KEY `dept` (`dept`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `department`
--

INSERT INTO `department` (`deptid`, `dept`, `dept_name`) VALUES
(1, 'IT', 'Information Technology'),
(11, 'TĐ', 'Trắc Địa'),
(14, 'CTN', 'Cấp Thoát Nước'),
(22, 'MT', 'Môi Trường');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `instructor`
--

DROP TABLE IF EXISTS `instructor`;
CREATE TABLE IF NOT EXISTS `instructor` (
  `insid` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL COMMENT '0:Nam,1:Nữ',
  `image` varchar(500) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `deptid` int(11) NOT NULL,
  PRIMARY KEY (`insid`),
  UNIQUE KEY `uid` (`uid`),
  KEY `InstructorDepartment` (`deptid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `instructor`
--

INSERT INTO `instructor` (`insid`, `uid`, `fullname`, `sex`, `image`, `email`, `deptid`) VALUES
(3, 52, 'Hoàng Thị Kiều Anh', 'Nữ', NULL, 'kieuanh@gmail.com', 11),
(5, 56, NULL, NULL, NULL, NULL, 1),
(8, 58, 'Từ Thanh Trí', '', NULL, '', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `question`
--

DROP TABLE IF EXISTS `question`;
CREATE TABLE IF NOT EXISTS `question` (
  `testid` int(11) NOT NULL,
  `qnid` int(11) NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `optiona` text,
  `optionb` text,
  `optionc` text,
  `optiond` text,
  `correctanswer` enum('optiona','optionb','optionc','optiond') DEFAULT NULL,
  `level` char(3) DEFAULT NULL COMMENT '0:Easy,1:Medium,2:Hard',
  `mark` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`qnid`,`testid`),
  KEY `tpid` (`testid`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `question`
--

INSERT INTO `question` (`testid`, `qnid`, `question`, `optiona`, `optionb`, `optionc`, `optiond`, `correctanswer`, `level`, `mark`) VALUES
(48, 39, '1+1=?', '4', '2', '4', '3', 'optiona', '0', '3.00'),
(50, 50, '1+1=?', '4', '2', '4', '3', 'optiona', '0', '5.00'),
(48, 56, 'hgggg', '', '', '', '', NULL, NULL, '4.00'),
(48, 57, 'abc', 'a', 'b', 'c', 'd', 'optionb', '1', '3.00'),
(50, 58, '1+2=?', '4', '3', '2', '5', 'optionb', '0', '2.50'),
(50, 59, '1+1=?', '4', '2', '4', '3', 'optiona', '0', '2.50'),
(49, 62, 'abc', 'a', 'b', 'c', 'd', 'optionb', '1', '3.00'),
(49, 63, '1+2=?', '4', '3', '2', '5', 'optionb', '0', '2.50'),
(49, 64, '1+1=?', '4', '2', '4', '3', 'optiona', '0', '2.50');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `questionbank`
--

DROP TABLE IF EXISTS `questionbank`;
CREATE TABLE IF NOT EXISTS `questionbank` (
  `tpid` int(11) NOT NULL,
  `qnbid` int(11) NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `optiona` text,
  `optionb` text,
  `optionc` text,
  `optiond` text,
  `correctanswer` enum('optiona','optionb','optionc','optiond') DEFAULT NULL,
  `level` char(3) DEFAULT NULL COMMENT '0:Easy,1:Medium,2:Hard',
  PRIMARY KEY (`qnbid`,`tpid`),
  KEY `tpid` (`tpid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `questionbank`
--

INSERT INTO `questionbank` (`tpid`, `qnbid`, `question`, `optiona`, `optionb`, `optionc`, `optiond`, `correctanswer`, `level`) VALUES
(1, 4, '1+1=?', '4', '2', '4', '3', 'optiona', '0'),
(2, 8, 'hgggg', '', '', '', '', NULL, NULL),
(3, 9, 'abc', 'a', 'b', 'c', 'd', 'optionb', '1'),
(1, 10, '1+2=?', '4', '3', '2', '5', 'optionb', '0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `report`
--

DROP TABLE IF EXISTS `report`;
CREATE TABLE IF NOT EXISTS `report` (
  `stdid` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `testid` int(11) NOT NULL,
  `marks` decimal(10,2) NOT NULL,
  `maxmarks` decimal(10,2) NOT NULL,
  `testdate` date DEFAULT NULL,
  KEY `stdid` (`stdid`),
  KEY `cid` (`cid`),
  KEY `uid` (`uid`),
  KEY `testid` (`testid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `report`
--

INSERT INTO `report` (`stdid`, `cid`, `uid`, `testid`, `marks`, `maxmarks`, `testdate`) VALUES
(40, 1, 50, 48, '8.00', '10.00', NULL),
(42, 2, 53, 49, '9.00', '10.00', NULL),
(44, 1, 59, 48, '7.00', '10.00', NULL),
(45, 1, 60, 48, '8.00', '10.00', NULL),
(40, 1, 50, 48, '9.00', '10.00', '2018-07-27');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `student`
--

DROP TABLE IF EXISTS `student`;
CREATE TABLE IF NOT EXISTS `student` (
  `stdid` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `deptid` int(11) NOT NULL,
  PRIMARY KEY (`stdid`),
  UNIQUE KEY `uid` (`uid`),
  KEY `StudentDepartment` (`deptid`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `student`
--

INSERT INTO `student` (`stdid`, `uid`, `fullname`, `sex`, `image`, `email`, `deptid`) VALUES
(40, 50, 'Nguyen Cong Thien Vu', NULL, NULL, NULL, 1),
(42, 53, NULL, NULL, NULL, NULL, 11),
(43, 55, NULL, NULL, NULL, NULL, 14),
(44, 59, NULL, NULL, NULL, NULL, 1),
(45, 60, NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `studentquestionreport`
--

DROP TABLE IF EXISTS `studentquestionreport`;
CREATE TABLE IF NOT EXISTS `studentquestionreport` (
  `testid` int(11) NOT NULL,
  `qnid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `answered` enum('answered','unanswered','review','') DEFAULT NULL,
  `stdanswer` enum('optiona','optionb','optionc','optiond') DEFAULT NULL,
  KEY `uid` (`uid`),
  KEY `testid` (`testid`),
  KEY `qnid` (`qnid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `studenttestreport`
--

DROP TABLE IF EXISTS `studenttestreport`;
CREATE TABLE IF NOT EXISTS `studenttestreport` (
  `testid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `starttime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `endtime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `correctlyanswerd` int(11) NOT NULL,
  `status` enum('over','inprogress') NOT NULL,
  KEY `testid` (`testid`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `test`
--

DROP TABLE IF EXISTS `test`;
CREATE TABLE IF NOT EXISTS `test` (
  `testid` int(11) NOT NULL AUTO_INCREMENT,
  `testname` varchar(255) NOT NULL,
  `testdescription` varchar(255) DEFAULT NULL,
  `testdate` date DEFAULT NULL,
  `testime` time DEFAULT NULL,
  `cid` int(11) NOT NULL,
  `testfrom` text,
  `testto` text,
  `duration` int(11) DEFAULT NULL,
  `totalquestions` int(11) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`testid`),
  KEY `TestCourse` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `test`
--

INSERT INTO `test` (`testid`, `testname`, `testdescription`, `testdate`, `testime`, `cid`, `testfrom`, `testto`, `duration`, `totalquestions`, `code`) VALUES
(48, '01', '', '2018-07-27', NULL, 1, '2018-07-23T16:03', '2018-07-23T17:03', 0, 3, '123'),
(49, '01', NULL, NULL, NULL, 2, '2018-07-23T16:03', '2018-07-23T16:03', NULL, 3, NULL),
(50, '02', '', NULL, NULL, 1, '2018-07-23T16:03', '2018-07-23T16:03', 0, 3, '123');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `topic`
--

DROP TABLE IF EXISTS `topic`;
CREATE TABLE IF NOT EXISTS `topic` (
  `cid` int(11) NOT NULL,
  `tpid` int(11) NOT NULL AUTO_INCREMENT,
  `topicname` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tpid`,`cid`),
  KEY `cid` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `topic`
--

INSERT INTO `topic` (`cid`, `tpid`, `topicname`, `description`) VALUES
(1, 1, 'Lập trình cơ bản.', 'abc'),
(1, 2, 'Mảng lập trình', NULL),
(1, 3, 'sad', 'jjjj'),
(4, 5, 'ghjghjghj', ''),
(4, 7, 'ddd', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `expired_token` datetime DEFAULT NULL,
  `role` char(3) NOT NULL COMMENT '0:Admin,1:Instructor,2:Student',
  `active` char(3) NOT NULL COMMENT '0: active,1: no active',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `Số báo danh` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`uid`, `username`, `password`, `token`, `expired_token`, `role`, `active`) VALUES
(1, 'Admin', '123', '1ufgecw7q0jjwlvye5', '2018-07-22 16:25:47', '0', '0'),
(50, '0350080063', '123', '1ufgecw7q0jjwlwgl9', '2018-07-22 21:09:14', '2', '0'),
(52, 'kieuanhcute', '123', '1ufgecw73ojjl069vg', '2018-07-14 13:31:04', '1', '0'),
(53, '0350080142', '123', '1ufgecw888jjwq2yyr', '2018-07-22 19:01:48', '2', '0'),
(55, '0350080042', '123', NULL, NULL, '2', '0'),
(56, 'anhto', '456', '1ufgecw5wgjjkx0hbp', '2018-07-14 12:02:35', '1', '0'),
(58, 'tuthanhtri', '123', '1ufgecw2cgjjw8pahh', '2018-07-22 21:15:16', '1', '0'),
(59, '0350080062', '123', NULL, NULL, '2', '0'),
(60, '0350080061', '123', NULL, NULL, '2', '0');

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `CourseForeignKey` FOREIGN KEY (`deptid`) REFERENCES `department` (`deptid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `instructor`
--
ALTER TABLE `instructor`
  ADD CONSTRAINT `ForeignKey` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `InstructorDepartment` FOREIGN KEY (`deptid`) REFERENCES `department` (`deptid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`testid`) REFERENCES `test` (`testid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `questionbank`
--
ALTER TABLE `questionbank`
  ADD CONSTRAINT `questionbank_ibfk_1` FOREIGN KEY (`tpid`) REFERENCES `topic` (`tpid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`stdid`) REFERENCES `student` (`stdid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `report_ibfk_2` FOREIGN KEY (`cid`) REFERENCES `course` (`cid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `report_ibfk_3` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `report_ibfk_4` FOREIGN KEY (`testid`) REFERENCES `test` (`testid`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `ForeignKeyStudent` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `StudentDepartment` FOREIGN KEY (`deptid`) REFERENCES `department` (`deptid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `studentquestionreport`
--
ALTER TABLE `studentquestionreport`
  ADD CONSTRAINT `studentquestionreport_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `studentquestionreport_ibfk_2` FOREIGN KEY (`testid`) REFERENCES `test` (`testid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `studentquestionreport_ibfk_3` FOREIGN KEY (`qnid`) REFERENCES `question` (`qnid`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `studenttestreport`
--
ALTER TABLE `studenttestreport`
  ADD CONSTRAINT `studenttestreport_ibfk_1` FOREIGN KEY (`testid`) REFERENCES `test` (`testid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `studenttestreport_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `test`
--
ALTER TABLE `test`
  ADD CONSTRAINT `TestCourse` FOREIGN KEY (`cid`) REFERENCES `course` (`cid`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `topic`
--
ALTER TABLE `topic`
  ADD CONSTRAINT `topic_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `course` (`cid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
