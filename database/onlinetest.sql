-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th10 18, 2018 lúc 03:35 PM
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `course`
--

INSERT INTO `course` (`cid`, `ccode`, `mcode`, `mname`, `cname`, `ects`, `year`, `sem`, `deptid`) VALUES
(1, 'LTCB311', '17011043', 'a', 'Lap trinh can ban', 3, '', '2', 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `department`
--

INSERT INTO `department` (`deptid`, `dept`, `dept_name`) VALUES
(1, 'CNTT', 'Công Nghệ Thông Tin'),
(2, 'CTN', 'Cấp Thoát Nước');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `departmentcourse`
--

DROP TABLE IF EXISTS `departmentcourse`;
CREATE TABLE IF NOT EXISTS `departmentcourse` (
  `dcid` int(11) NOT NULL AUTO_INCREMENT,
  `dcname` varchar(255) NOT NULL,
  `dcdetail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`dcid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `departmentcourse`
--

INSERT INTO `departmentcourse` (`dcid`, `dcname`, `dcdetail`) VALUES
(1, '01', '2014-2018'),
(2, '02', ''),
(3, '03', NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `instructor`
--

INSERT INTO `instructor` (`insid`, `uid`, `fullname`, `sex`, `image`, `email`, `deptid`) VALUES
(1, 4, 'Từ Thanh Trí', '', NULL, 'tuthanhtri@gmail.com', 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `question`
--

INSERT INTO `question` (`testid`, `qnid`, `question`, `optiona`, `optionb`, `optionc`, `optiond`, `correctanswer`, `level`, `mark`) VALUES
(1, 23, 'Có thể Copy toàn bộ cài đặt Windows XP Vào ổ đĩa Flash USB có dung lượng 256MB được không:', 'Hoàn toàn được', 'Không thể được vì bộ cài đặt WindowsXP lớn hơn 256 Mb', 'Câu A đúng', 'Không có câu trả lời nào đúng', 'optionb', '0', '2.00'),
(1, 24, 'Bấm phím nào trong các phím sau dùng để nới rộng một cấp Folder trên cửa sổ TreeView của Windows Explorer:', 'Mũi tên lên', 'Mũi tên xuống', 'Mũi tên qua trái', 'Mũi tên qua phải', 'optionc', '0', '2.00'),
(1, 25, 'Chọn câu phát biểu không chính  xác:', 'Chọn nhiều Folder, File liên tục: Kích chuột tại tên Folder/ File đầu tiên, rồi nhấn giữ phím Shift và kích chuột tại tên Folder/ File cuối', 'Chọn nhiều Folder, File không liên tục:nhấn giữ phím Shift trong khi kích chuột tại tên các Folder File', 'Chọn nhiều Folder, File không liên tục:nhấn giữ phím Ctrl trong khi kích chuột tại tên các Folder File', 'Chọn một Folder/ File: kích chuột tại tên Folder/ File', 'optionc', '0', '2.00'),
(1, 26, 'Chọn cách nào trong các cách sau để chuyển qua lại giữa các ứng dụng đang được kích hoạt trên Windows:', 'Dùng chuột kích chọn vào tên ứng dụng ở trên TaskBar', 'Dùng tổ hợp phím Alt + Tab để chọn ứng dụng cần làm việc', 'Cả A và B đều không được', 'Cả A và B đều được', 'optiond', '0', '2.00'),
(1, 27, 'Ấn chuột phải vào một thư mục, chọn Properties. Thao tác này có  thể:', 'Xem các thông tin chi tiết của thư mục', 'Đổi tên thư mục', 'Thiết đặt các thuộc tính (chỉ đọc, ẩn…) cho thư mục', 'Cả A và C đều đúng', 'optiond', '0', '2.00'),
(2, 28, 'Ấn chuột phải vào một thư mục, chọn Properties. Thao tác này có  thể:', 'Xem các thông tin chi tiết của thư mục', 'Đổi tên thư mục', 'Thiết đặt các thuộc tính (chỉ đọc, ẩn…) cho thư mục', 'Cả A và C đều đúng', 'optiond', '0', '1.50'),
(2, 29, 'Chọn cách nào trong các cách sau để chuyển qua lại giữa các ứng dụng đang được kích hoạt trên Windows:', 'Dùng chuột kích chọn vào tên ứng dụng ở trên TaskBar', 'Dùng tổ hợp phím Alt + Tab để chọn ứng dụng cần làm việc', 'Cả A và B đều không được', 'Cả A và B đều được', 'optiond', '0', '1.50'),
(2, 30, 'Chọn câu phát biểu không chính  xác:', 'Chọn nhiều Folder, File liên tục: Kích chuột tại tên Folder/ File đầu tiên, rồi nhấn giữ phím Shift và kích chuột tại tên Folder/ File cuối', 'Chọn nhiều Folder, File không liên tục:nhấn giữ phím Shift trong khi kích chuột tại tên các Folder File', 'Chọn nhiều Folder, File không liên tục:nhấn giữ phím Ctrl trong khi kích chuột tại tên các Folder File', 'Chọn một Folder/ File: kích chuột tại tên Folder/ File', 'optionc', '0', '1.50'),
(2, 31, 'Bấm phím nào trong các phím sau dùng để nới rộng một cấp Folder trên cửa sổ TreeView của Windows Explorer:', 'Mũi tên lên', 'Mũi tên xuống', 'Mũi tên qua trái', 'Mũi tên qua phải', 'optionc', '0', '1.50'),
(2, 32, 'Có thể Copy toàn bộ cài đặt Windows XP Vào ổ đĩa Flash USB có dung lượng 256MB được không:', 'Hoàn toàn được', 'Không thể được vì bộ cài đặt WindowsXP lớn hơn 256 Mb', 'Câu A đúng', 'Không có câu trả lời nào đúng', 'optionb', '0', '1.50'),
(2, 36, 'Chọn câu phát biểu không chính xác:', 'Chọn nhiều Folder, File liên tục: Kích chuột tại tên Folder/ File đầu tiên, rồi nhấn giữ phím Shift và kích chuột tại tên Folder/ File cuối', 'Chọn nhiều Folder, File không liên tục:nhấn giữ phím Shift trong khi kích chuột tại tên các Folder File', 'Chọn nhiều Folder, File không liên tục:nhấn giữ phím Ctrl trong khi kích chuột tại tên các Folder File', 'Chọn một Folder/ File: kích chuột tại tên Folder/ File', 'optionb', '1', '2.50'),
(3, 89, 'Bấm phím nào trong các phím sau dùng để nới rộng một cấp Folder trên cửa sổ TreeView của Windows Explorer:', 'Mũi tên lên', 'Mũi tên xuống', 'Mũi tên qua trái', 'Mũi tên qua phải', 'optionc', '0', '3.00'),
(3, 90, 'Chọn câu phát biểu không chính  xác:', 'Chọn nhiều Folder, File liên tục: Kích chuột tại tên Folder/ File đầu tiên, rồi nhấn giữ phím Shift và kích chuột tại tên Folder/ File cuối', 'Chọn nhiều Folder, File không liên tục:nhấn giữ phím Shift trong khi kích chuột tại tên các Folder File', 'Chọn nhiều Folder, File không liên tục:nhấn giữ phím Ctrl trong khi kích chuột tại tên các Folder File', 'Chọn một Folder/ File: kích chuột tại tên Folder/ File', 'optionc', '0', '3.00'),
(3, 91, 'Chọn cách nào trong các cách sau để chuyển qua lại giữa các ứng dụng đang được kích hoạt trên Windows:', 'Dùng chuột kích chọn vào tên ứng dụng ở trên TaskBar', 'Dùng tổ hợp phím Alt + Tab để chọn ứng dụng cần làm việc', 'Cả A và B đều không được', 'Cả A và B đều được', 'optiond', '0', '3.00'),
(3, 92, 'Chọn câu phát biểu không chính xác:', 'Chọn nhiều Folder, File liên tục: Kích chuột tại tên Folder/ File đầu tiên, rồi nhấn giữ phím Shift và kích chuột tại tên Folder/ File cuối', 'Chọn nhiều Folder, File không liên tục:nhấn giữ phím Shift trong khi kích chuột tại tên các Folder File', 'Chọn nhiều Folder, File không liên tục:nhấn giữ phím Ctrl trong khi kích chuột tại tên các Folder File', 'Chọn một Folder/ File: kích chuột tại tên Folder/ File', 'optionb', '1', '1.00');

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `questionbank`
--

INSERT INTO `questionbank` (`tpid`, `qnbid`, `question`, `optiona`, `optionb`, `optionc`, `optiond`, `correctanswer`, `level`) VALUES
(1, 1, 'Chọn câu phát biểu không chính  xác:', 'Chọn nhiều Folder, File liên tục: Kích chuột tại tên Folder/ File đầu tiên, rồi nhấn giữ phím Shift và kích chuột tại tên Folder/ File cuối', 'Chọn nhiều Folder, File không liên tục:nhấn giữ phím Shift trong khi kích chuột tại tên các Folder File', 'Chọn nhiều Folder, File không liên tục:nhấn giữ phím Ctrl trong khi kích chuột tại tên các Folder File', 'Chọn một Folder/ File: kích chuột tại tên Folder/ File', 'optionc', '0'),
(1, 2, 'Ấn chuột phải vào một thư mục, chọn Properties. Thao tác này có  thể:', 'Xem các thông tin chi tiết của thư mục', 'Đổi tên thư mục', 'Thiết đặt các thuộc tính (chỉ đọc, ẩn…) cho thư mục', 'Cả A và C đều đúng', 'optiond', '0'),
(1, 3, 'Bấm phím nào trong các phím sau dùng để nới rộng một cấp Folder trên cửa sổ TreeView của Windows Explorer:', 'Mũi tên lên', 'Mũi tên xuống', 'Mũi tên qua trái', 'Mũi tên qua phải', 'optionc', '0'),
(1, 4, 'Chọn cách nào trong các cách sau để chuyển qua lại giữa các ứng dụng đang được kích hoạt trên Windows:', 'Dùng chuột kích chọn vào tên ứng dụng ở trên TaskBar', 'Dùng tổ hợp phím Alt + Tab để chọn ứng dụng cần làm việc', 'Cả A và B đều không được', 'Cả A và B đều được', 'optiond', '0'),
(1, 5, 'Có thể Copy toàn bộ cài đặt Windows XP Vào ổ đĩa Flash USB có dung lượng 256MB được không:', 'Hoàn toàn được', 'Không thể được vì bộ cài đặt WindowsXP lớn hơn 256 Mb', 'Câu A đúng', 'Không có câu trả lời nào đúng', 'optionb', '0'),
(2, 6, 'Chọn câu phát biểu không chính xác:', 'Chọn nhiều Folder, File liên tục: Kích chuột tại tên Folder/ File đầu tiên, rồi nhấn giữ phím Shift và kích chuột tại tên Folder/ File cuối', 'Chọn nhiều Folder, File không liên tục:nhấn giữ phím Shift trong khi kích chuột tại tên các Folder File', 'Chọn nhiều Folder, File không liên tục:nhấn giữ phím Ctrl trong khi kích chuột tại tên các Folder File', 'Chọn một Folder/ File: kích chuột tại tên Folder/ File', 'optionb', '1');

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
  `testdate` datetime DEFAULT NULL,
  KEY `stdid` (`stdid`),
  KEY `cid` (`cid`),
  KEY `uid` (`uid`),
  KEY `testid` (`testid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `report`
--

INSERT INTO `report` (`stdid`, `cid`, `uid`, `testid`, `marks`, `maxmarks`, `testdate`) VALUES
(1, 1, 2, 1, '6.00', '10.00', '0000-00-00 00:00:00'),
(1, 1, 2, 1, '2.00', '10.00', '0000-00-00 00:00:00'),
(1, 1, 2, 1, '4.00', '10.00', '2018-11-23 00:00:00'),
(1, 1, 2, 1, '4.00', '10.00', '2018-11-23 00:00:00'),
(1, 1, 2, 1, '7.00', '10.00', '2018-11-16 06:27:46'),
(1, 1, 2, 1, '7.00', '10.00', '2018-11-16 06:27:46'),
(1, 1, 2, 1, '10.00', '10.00', '0000-00-00 00:00:00'),
(1, 1, 2, 1, '2.00', '10.00', '0000-00-00 00:00:00'),
(1, 1, 2, 1, '2.00', '10.00', '2018-11-18 21:45:54'),
(1, 1, 2, 1, '10.00', '10.00', '2018-11-18 21:54:29');

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
  `dcid` int(11) NOT NULL,
  PRIMARY KEY (`stdid`),
  UNIQUE KEY `uid` (`uid`),
  KEY `StudentDepartment` (`deptid`),
  KEY `StudentDepartmentCourse` (`dcid`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `student`
--

INSERT INTO `student` (`stdid`, `uid`, `fullname`, `sex`, `image`, `email`, `deptid`, `dcid`) VALUES
(1, 2, 'Thien Vu Nguyen', NULL, NULL, NULL, 1, 1),
(2, 3, NULL, NULL, NULL, NULL, 2, 2),
(39, 33, NULL, NULL, NULL, NULL, 1, 2),
(40, 34, NULL, NULL, NULL, NULL, 1, 2);

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `test`
--

INSERT INTO `test` (`testid`, `testname`, `testdescription`, `testdate`, `testime`, `cid`, `testfrom`, `testto`, `duration`, `totalquestions`, `code`) VALUES
(1, '001', '', NULL, NULL, 1, '2018-11-18T21:33', '2018-11-18T23:27', 45, 5, '123'),
(2, '002', '', NULL, NULL, 1, '', '', 45, 4, ''),
(3, '003', '', NULL, NULL, 1, '', '', 45, 4, '');

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `topic`
--

INSERT INTO `topic` (`cid`, `tpid`, `topicname`, `description`) VALUES
(1, 1, 'Ly Thuyet', ''),
(1, 2, 'Thuc Hanh', ''),
(1, 3, 'Nang Cao', '');

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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`uid`, `username`, `password`, `token`, `expired_token`, `role`, `active`) VALUES
(1, 'Admin', '123', '1ufgecw5kgjompbmeo', '2018-11-18 17:21:22', '0', '0'),
(2, '0350080063', '123', '1ufgecw23sjomyxyry', '2018-11-18 22:30:41', '2', '0'),
(3, '0350080021', '123', NULL, NULL, '2', '0'),
(4, 'tuthanhtri', '123', '1ufgecw23sjomz966a', '2018-11-18 21:59:24', '1', '0'),
(33, '0250080061', '123', NULL, NULL, '2', '0'),
(34, '0250080062', '123', NULL, NULL, '2', '0');

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
  ADD CONSTRAINT `StudentDepartment` FOREIGN KEY (`deptid`) REFERENCES `department` (`deptid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `StudentDepartmentCourse` FOREIGN KEY (`dcid`) REFERENCES `departmentcourse` (`dcid`) ON DELETE CASCADE ON UPDATE CASCADE;

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
