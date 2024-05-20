-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.11.7-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for course_register_management
CREATE DATABASE IF NOT EXISTS `course_register_management` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `course_register_management`;

-- Dumping structure for table course_register_management.classes
CREATE TABLE IF NOT EXISTS `classes` (
  `capacity` int(11) NOT NULL,
  `current` int(11) NOT NULL,
  `end_date` date DEFAULT NULL,
  `semester_id` int(11) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `course_id` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `lecturer_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `theory` varchar(255) DEFAULT NULL,
  `status` enum('OPEN','CLOSE') DEFAULT NULL,
  `type` enum('THEORY','PRACTICE') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9v6ijeybapa0ontdtd4o4rycs` (`course_id`),
  KEY `FKq766glta29j1wj99ncbwy18ob` (`lecturer_id`),
  KEY `FK8menn4iwjhqtjd5gq4bklkrj5` (`semester_id`),
  CONSTRAINT `FK8menn4iwjhqtjd5gq4bklkrj5` FOREIGN KEY (`semester_id`) REFERENCES `semesters` (`id`),
  CONSTRAINT `FK9v6ijeybapa0ontdtd4o4rycs` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  CONSTRAINT `FKq766glta29j1wj99ncbwy18ob` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table course_register_management.classes: ~51 rows (approximately)
INSERT INTO `classes` (`capacity`, `current`, `end_date`, `semester_id`, `start_date`, `course_id`, `id`, `lecturer_id`, `name`, `theory`, `status`, `type`) VALUES
	(27, 0, '2024-09-13', 1, '2024-05-19', '22205945', '20175557', '27081185', 'DHKTPM17B.1', '25075531', 'OPEN', 'PRACTICE'),
	(27, 0, '2024-10-19', 1, '2024-05-19', '26829446', '20534635', '28352471', 'DHKTPM18A.2', '29715729', 'OPEN', 'PRACTICE'),
	(80, 0, '2024-09-19', 1, '2024-05-19', '24587512', '20538790', '24098071', 'DHKHMT18A', '', 'OPEN', 'THEORY'),
	(80, 0, '2024-09-19', 1, '2024-05-19', '24587512', '20925146', '24098071', 'DHKHMT18B', '', 'OPEN', 'THEORY'),
	(27, 0, '2024-10-19', 1, '2024-05-19', '25839173', '20937669', '20529890', 'DHTH19A.2', '22605995', 'OPEN', 'PRACTICE'),
	(27, 0, '2024-09-13', 1, '2024-05-19', '22205945', '21501503', '27081185', 'DHKTPM17C.1', '22369729', 'OPEN', 'PRACTICE'),
	(27, 0, '2024-10-19', 1, '2024-05-19', '26829446', '22277264', '28352471', 'DHKTPM18A.1', '29715729', 'OPEN', 'PRACTICE'),
	(80, 0, '2024-09-13', 1, '2024-05-19', '22205945', '22369729', '27081185', 'DHKTPM17C', '', 'OPEN', 'THEORY'),
	(79, 0, '2024-08-27', 1, '2024-05-19', '24222994', '22465372', '28352471', 'DHCNTT16A', '', 'OPEN', 'THEORY'),
	(80, 0, '2024-08-19', 1, '2024-05-19', '25839173', '22605995', '20529890', 'DHTH19A', '', 'OPEN', 'THEORY'),
	(27, 0, '2024-09-29', 1, '2024-05-19', '22438242', '22646013', '29699847', 'DHKHMT18A.1', '26840714', 'OPEN', 'PRACTICE'),
	(79, 0, '2024-08-29', 1, '2024-05-19', '22580833', '22675577', '28752591', 'DHKTPM17A', '', 'OPEN', 'THEORY'),
	(27, 0, '2024-09-20', 1, '2024-05-19', '24982482', '22687979', '24573791', 'DHTH19A.1', '25034259', 'OPEN', 'PRACTICE'),
	(27, 0, '2024-10-19', 1, '2024-05-19', '25839173', '23172621', '20529890', 'DHTH19A.1', '22605995', 'OPEN', 'PRACTICE'),
	(80, 0, '2024-09-13', 1, '2024-05-19', '22183162', '23480118', '22400359', 'DHKTPM17A', '', 'OPEN', 'THEORY'),
	(27, 0, '2024-09-13', 1, '2024-05-19', '22205945', '23528666', '27081185', 'DHKTPM17B.3', '25075531', 'OPEN', 'PRACTICE'),
	(80, 0, '2024-09-13', 1, '2024-05-19', '22205945', '23791030', '27081185', 'DHKTPM17A', '', 'OPEN', 'THEORY'),
	(79, 0, '2024-10-19', 1, '2024-05-19', '27075071', '24095794', '26340840', 'DHCNTT18A', '', 'OPEN', 'THEORY'),
	(27, 0, '2024-09-13', 1, '2024-05-19', '22205945', '24112793', '27081185', 'DHKTPM17A.1', '23791030', 'OPEN', 'PRACTICE'),
	(27, 0, '2024-09-13', 1, '2024-05-19', '22205945', '24339170', '27081185', 'DHKTPM17C.2', '22369729', 'OPEN', 'PRACTICE'),
	(79, 0, '2024-10-19', 1, '2024-05-19', '28294758', '24415515', '28145957', 'DHKTPM16A', '', 'OPEN', 'THEORY'),
	(27, 0, '2024-09-13', 1, '2024-05-19', '22205945', '24419390', '27081185', 'DHKTPM17C.3', '22369729', 'OPEN', 'PRACTICE'),
	(80, 0, '2024-09-13', 1, '2024-05-19', '20672252', '24421121', '27422599', 'DHKTPM17C', '', 'OPEN', 'THEORY'),
	(80, 0, '2024-09-13', 1, '2024-05-19', '22183162', '24673710', '22400359', 'DHKTPM17C', '', 'OPEN', 'THEORY'),
	(27, 0, '2024-10-19', 1, '2024-05-19', '28190889', '24878245', '27081185', 'DHKTPM18A.1', '28728535', 'OPEN', 'PRACTICE'),
	(80, 0, '2024-10-20', 1, '2024-05-19', '24982482', '25034259', '24573791', 'DHTH19A', '', 'OPEN', 'THEORY'),
	(80, 0, '2024-09-13', 1, '2024-05-19', '22205945', '25075531', '27081185', 'DHKTPM17B', '', 'OPEN', 'THEORY'),
	(80, 0, '2024-09-13', 1, '2024-05-19', '20672252', '25297644', '20529890', 'DHKTPM17B', '', 'OPEN', 'THEORY'),
	(27, 0, '2024-09-20', 1, '2024-05-19', '24982482', '25686003', '24573791', 'DHTH19A.2', '25034259', 'OPEN', 'PRACTICE'),
	(27, 0, '2024-10-28', 1, '2024-05-19', '24066124', '25725554', '28145957', 'DHKTPM16A.3', '29846888', 'OPEN', 'PRACTICE'),
	(27, 0, '2024-10-28', 1, '2024-05-19', '24066124', '26116507', '28145957', 'DHKTPM16A.2', '29846888', 'OPEN', 'PRACTICE'),
	(27, 0, '2024-10-19', 1, '2024-05-19', '27075071', '26268051', '26340840', 'DHCNTT18A.2', '24095794', 'OPEN', 'PRACTICE'),
	(79, 0, '2024-08-29', 1, '2024-05-19', '22580833', '26483341', '28752591', 'DHKTPM17B', '', 'OPEN', 'THEORY'),
	(27, 0, '2024-10-19', 1, '2024-05-19', '25839173', '26608084', '20529890', 'DHTH19A.3', '22605995', 'OPEN', 'PRACTICE'),
	(27, 0, '2024-09-13', 1, '2024-05-19', '22205945', '26656727', '27081185', 'DHKTPM17A.3', '23791030', 'OPEN', 'PRACTICE'),
	(27, 0, '2024-10-19', 1, '2024-05-19', '27075071', '26714507', '26340840', 'DHCNTT18A.1', '24095794', 'OPEN', 'PRACTICE'),
	(27, 0, '2024-09-13', 1, '2024-05-19', '22205945', '26752254', '27081185', 'DHKTPM17B.2', '25075531', 'OPEN', 'PRACTICE'),
	(80, 1, '2024-09-26', 1, '2024-05-19', '22438242', '26840714', '29699847', 'DHKHMT18A', '', 'OPEN', 'THEORY'),
	(80, 0, '2024-09-13', 1, '2024-05-19', '22183162', '27139533', '22400359', 'DHKTPM17B', '', 'OPEN', 'THEORY'),
	(27, 0, '2024-10-19', 1, '2024-05-19', '28294758', '27337463', '28145957', 'DHKTPM16A.3', '24415515', 'OPEN', 'PRACTICE'),
	(27, 0, '2024-09-29', 1, '2024-05-19', '22438242', '28272518', '29699847', 'DHKHMT18A.2', '26840714', 'OPEN', 'PRACTICE'),
	(26, 0, '2024-10-19', 1, '2024-05-19', '28190889', '28577190', '27081185', 'DHKTPM18A.3', '28728535', 'OPEN', 'PRACTICE'),
	(27, 0, '2024-09-13', 1, '2024-05-19', '22205945', '28587166', '27081185', 'DHKTPM17A.2', '23791030', 'OPEN', 'PRACTICE'),
	(80, 0, '2024-10-19', 1, '2024-05-19', '28190889', '28728535', '27081185', 'DHKTPM18A', '', 'OPEN', 'THEORY'),
	(80, 0, '2024-09-13', 1, '2024-05-19', '20672252', '28729848', '20529890', 'DHKTPM17C', '', 'OPEN', 'THEORY'),
	(27, 0, '2024-10-19', 1, '2024-05-19', '27075071', '29004125', '26340840', 'DHCNTT18A.3', '24095794', 'OPEN', 'PRACTICE'),
	(27, 0, '2024-10-19', 1, '2024-05-19', '28294758', '29349032', '28145957', 'DHKTPM16A.1', '24415515', 'OPEN', 'PRACTICE'),
	(26, 0, '2024-10-19', 1, '2024-05-19', '28190889', '29597780', '27081185', 'DHKTPM18A.2', '28728535', 'OPEN', 'PRACTICE'),
	(80, 0, '2024-10-19', 1, '2024-05-19', '27880772', '29643855', '21088407', 'DHKHMT18A', '', 'OPEN', 'THEORY'),
	(80, 0, '2024-10-19', 1, '2024-05-19', '26829446', '29715729', '28352471', 'DHKTPM18A', '', 'OPEN', 'THEORY'),
	(27, 0, '2024-10-19', 1, '2024-05-19', '28294758', '29741757', '28145957', 'DHKTPM16A.2', '24415515', 'OPEN', 'PRACTICE'),
	(27, 0, '2024-10-28', 1, '2024-05-19', '24066124', '29764642', '28145957', 'DHKTPM16A.1', '29846888', 'OPEN', 'PRACTICE'),
	(79, 0, '2024-10-28', 1, '2024-05-19', '24066124', '29846888', '28145957', 'DHKTPM16A', '', 'OPEN', 'THEORY'),
	(27, 0, '2024-10-19', 1, '2024-05-19', '26829446', '29918572', '28352471', 'DHKTPM18A.3', '29715729', 'OPEN', 'PRACTICE');

-- Dumping structure for table course_register_management.courses
CREATE TABLE IF NOT EXISTS `courses` (
  `credit` int(11) NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `prerequisite` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table course_register_management.courses: ~15 rows (approximately)
INSERT INTO `courses` (`credit`, `description`, `id`, `name`, `prerequisite`) VALUES
	(3, 'học về xác xuất ', '20672252', 'Cấu trúc rời rạc', NULL),
	(4, 'Hiểu rõ và nắm vững các kiến thức về cấu trúc dữ liệu và giải thuật', '22183162', 'Cấu trúc dữ liệu và giải thuật', '25839173'),
	(4, 'Lập trình phân tán bằng ngôn ngữ lập trình Java', '22205945', 'Lập trình phân tán', '28190889'),
	(3, 'Học phân tích dử liệu bằng python', '22438242', 'Lập trình phân tích dữ liệu 1', NULL),
	(3, 'Hiểu rõ và nắm các kiến thức cơ bản về tổng quan phần mềm', '22580833', 'Công nghệ phần mềm', NULL),
	(4, 'Hiểu rõ và nắm cơ bản về các kiến trúc phần mềm hiện nay', '24066124', 'Kiến trúc và thiết kế phần mềm', '22580833'),
	(3, 'Học cách tạo ra 1 trang web bằng wordpress, và các luận trong thương mại điện tử', '24222994', 'Thương mại điện tử', NULL),
	(3, 'Hiểu rõ và nắm cơ bản các thuật toán trong đồ thị', '24587512', 'Lý thuyết đồ thị', '20672252'),
	(4, 'Hiểu rõ và nắm vững các kiến thức về máy tính như hệ điều hành, phần cứng', '24982482', 'Hệ thống máy tính', NULL),
	(3, 'Làm quen với việc code sử dụng ngôn ngữ C', '25839173', 'Nhập môn Lập trình', NULL),
	(3, 'Hiểu rõ và nắm vững các kiến thức về cơ sở dữ liệu', '26829446', 'Hệ cơ sở dữ liệu', NULL),
	(3, 'Tạo ra các trang web cơ bản bằng HTML,CSS,JS', '27075071', '	 Hệ Thống và Công nghệ Web', NULL),
	(3, 'Hiểu rõ và nắm vững các kiến thức về mạng', '27880772', 'Mạng máy tính', '24982482'),
	(3, 'Lập trình cơ bản với ngôn ngữ lập trình C', '28190889', 'Kỹ thuật lập trình', NULL),
	(4, 'Lập trình website bằng ngôn ngữ lập trình Java', '28294758', 'Lập trình WWW', '22205945');

-- Dumping structure for table course_register_management.departments
CREATE TABLE IF NOT EXISTS `departments` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table course_register_management.departments: ~5 rows (approximately)
INSERT INTO `departments` (`id`, `name`) VALUES
	('1', 'Công nghệ thông tin'),
	('2', 'Quản trị kinh doanh'),
	('3', 'Kinh doanh quốc tế'),
	('4', 'Công nghệ may'),
	('5', 'Công nghệ thực phẩm');

-- Dumping structure for table course_register_management.enrollments
CREATE TABLE IF NOT EXISTS `enrollments` (
  `created_at` date DEFAULT NULL,
  `class_id` varchar(255) NOT NULL,
  `student_id` varchar(255) NOT NULL,
  PRIMARY KEY (`class_id`,`student_id`),
  KEY `FK8kf1u1857xgo56xbfmnif2c51` (`student_id`),
  CONSTRAINT `FK8kf1u1857xgo56xbfmnif2c51` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  CONSTRAINT `FKloh1q3o1ua6yuw9mwqdvhc54u` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table course_register_management.enrollments: ~0 rows (approximately)
INSERT INTO `enrollments` (`created_at`, `class_id`, `student_id`) VALUES
	('2024-05-19', '26840714', '21212328');

-- Dumping structure for table course_register_management.lecturers
CREATE TABLE IF NOT EXISTS `lecturers` (
  `admin` bit(1) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `department_id` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `gender` enum('MALE','FEMALE') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpowy6g9rglsdytsdu6c9fymox` (`department_id`),
  CONSTRAINT `FKpowy6g9rglsdytsdu6c9fymox` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table course_register_management.lecturers: ~12 rows (approximately)
INSERT INTO `lecturers` (`admin`, `date_of_birth`, `department_id`, `email`, `full_name`, `id`, `password`, `phone`, `username`, `gender`) VALUES
	(b'0', '1970-04-28', '1', 'hoangnguyen@gmail.com', 'Nguyễn Văn Thắng', '20529890', 'MjA1Mjk4OTA=', '0123456789', '20529890', 'MALE'),
	(b'0', '1999-05-19', '1', 'dangthithuha@gmail.com', 'Châu Thị Bảo Hà', '21088407', 'MjEwODg0MDc=', '0976474173', '21088407', 'FEMALE'),
	(b'0', '1977-09-12', '1', 'hoangkhanhiuh@gmail.com', 'Nguyễn Thị Hoàng Khánh', '22400359', 'MjI0MDAzNTk=', '0978654213', '22400359', 'FEMALE'),
	(b'0', '1997-05-19', '1', 'conguyetnaduongvuland@gmail.com', 'Trần Văn Vinh', '24098071', 'MjQwOTgwNzE=', '0976474171', '24098071', 'MALE'),
	(b'0', '1999-05-19', '1', 'tieutuong257d@gmail.com', 'Lê Thị Thủy', '24573791', 'MjQ1NzM3OTE=', '0902119803', '24573791', 'MALE'),
	(b'0', '1999-05-19', '1', 'dangthithuhaiuh@gmail.com', 'Đặng Thị Thu Hà', '26340840', 'MjYzNDA4NDA=', '0976474172', '26340840', 'MALE'),
	(b'0', '1980-04-28', '1', 'trung123@gmail.com', 'Trần Thế Trung', '27081185', 'MjcwODExODU=', '0123456798', '27081185', 'MALE'),
	(b'0', '1972-10-05', '1', 'huutinhiuh@gmail.com', 'Nguyễn Hữu Tình', '27422599', 'Mjc0MjI1OTk=', '0907124356', '27422599', 'MALE'),
	(b'1', '1970-05-06', '1', 'vovanhaiuh@gmail.com', 'Võ Văn Hải', '28145957', 'MjgxNDU5NTc=', '0345167899', '28145957', 'MALE'),
	(b'0', '1975-05-10', '1', 'dungngoiuh@gmail.com', 'Ngô Hữu Dũng', '28352471', 'MjgzNTI0NzE=', '0324786712', '28352471', 'MALE'),
	(b'0', '1989-04-28', '1', 'hoangngocnguyen2021@gmail.com', 'Nguyễn Thị Hạnh', '28752591', 'Mjg3NTI1OTE=', '0912345678', '28752591', 'MALE'),
	(b'0', '1990-05-19', '1', 'letrongngoc@gmail.com', 'Lê Trọng Ngọc', '29699847', 'Mjk2OTk4NDc=', '0976474170', '29699847', 'MALE');

-- Dumping structure for table course_register_management.schedules
CREATE TABLE IF NOT EXISTS `schedules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` date DEFAULT NULL,
  `class_id` varchar(255) DEFAULT NULL,
  `name` enum('MORNING','AFTERNOON','EVENING') DEFAULT NULL,
  `room` enum('H201','H202','H301','H302','H401','H402') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKe9px6t0yucpeap743s7dvjnr1` (`class_id`),
  CONSTRAINT `FKe9px6t0yucpeap743s7dvjnr1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table course_register_management.schedules: ~0 rows (approximately)
INSERT INTO `schedules` (`id`, `time`, `class_id`, `name`, `room`) VALUES
	(14, '2024-05-19', '20175557', 'MORNING', 'H201'),
	(15, '2024-05-19', '20534635', 'MORNING', 'H301'),
	(16, '2024-05-19', '20538790', 'AFTERNOON', 'H201'),
	(17, '2024-05-19', '20925146', 'AFTERNOON', 'H202'),
	(18, '2024-05-19', '20937669', 'AFTERNOON', 'H202'),
	(19, '2024-05-19', '21501503', 'AFTERNOON', 'H202'),
	(20, '2024-05-19', '22277264', 'EVENING', 'H301'),
	(21, '2024-05-19', '22369729', 'EVENING', 'H301'),
	(22, '2024-05-19', '22465372', 'EVENING', 'H301'),
	(23, '2024-05-19', '22605995', 'MORNING', 'H302'),
	(24, '2024-05-19', '22646013', 'MORNING', 'H302'),
	(25, '2024-05-19', '22675577', 'MORNING', 'H302'),
	(26, '2024-05-19', '22687979', 'AFTERNOON', 'H302'),
	(27, '2024-05-19', '23172621', 'AFTERNOON', 'H401'),
	(28, '2024-05-19', '23480118', 'EVENING', 'H401'),
	(29, '2024-05-19', '23528666', 'AFTERNOON', 'H401'),
	(30, '2024-05-19', '23791030', 'MORNING', 'H302'),
	(31, '2024-05-19', '24095794', 'AFTERNOON', 'H401'),
	(32, '2024-05-19', '24112793', 'EVENING', 'H402'),
	(33, '2024-05-19', '24339170', 'EVENING', 'H202'),
	(34, '2024-05-19', '24415515', 'MORNING', 'H301'),
	(35, '2024-05-19', '24419390', 'MORNING', 'H302'),
	(36, '2024-05-19', '24421121', 'MORNING', 'H301'),
	(37, '2024-05-19', '24673710', 'MORNING', 'H301'),
	(38, '2024-05-19', '24878245', 'AFTERNOON', 'H202'),
	(39, '2024-05-19', '25034259', 'EVENING', 'H202'),
	(40, '2024-05-19', '25075531', 'MORNING', 'H202'),
	(41, '2024-05-21', '22369729', 'AFTERNOON', 'H202'),
	(42, '2024-05-19', '25297644', 'MORNING', 'H201'),
	(43, '2024-05-19', '29918572', 'AFTERNOON', 'H301'),
	(44, '2024-05-19', '29846888', 'AFTERNOON', 'H301'),
	(45, '2024-05-19', '29764642', 'EVENING', 'H302'),
	(46, '2024-05-19', '29741757', 'AFTERNOON', 'H302'),
	(47, '2024-05-19', '29715729', 'AFTERNOON', 'H301'),
	(48, '2024-05-19', '29643855', 'EVENING', 'H202'),
	(49, '2024-05-19', '29643855', 'MORNING', 'H302'),
	(50, '2024-05-19', '29597780', 'MORNING', 'H302'),
	(51, '2024-05-19', '29349032', 'MORNING', 'H302'),
	(52, '2024-05-19', '29004125', 'EVENING', 'H202'),
	(53, '2024-05-19', '28729848', 'MORNING', 'H202'),
	(54, '2024-05-19', '28728535', 'EVENING', 'H401'),
	(55, '2024-05-19', '28587166', 'MORNING', 'H202'),
	(56, '2024-05-19', '28577190', 'MORNING', 'H301'),
	(57, '2024-05-19', '28272518', 'AFTERNOON', 'H302'),
	(58, '2024-05-19', '27337463', 'AFTERNOON', 'H302'),
	(59, '2024-05-19', '27139533', 'MORNING', 'H402'),
	(60, '2024-05-19', '26840714', 'EVENING', 'H302'),
	(61, '2024-05-19', '26752254', 'MORNING', 'H301'),
	(62, '2024-05-19', '26714507', 'EVENING', 'H301'),
	(63, '2024-05-19', '26656727', 'AFTERNOON', 'H402'),
	(64, '2024-05-19', '26608084', 'EVENING', 'H402'),
	(65, '2024-05-19', '26483341', 'AFTERNOON', 'H302'),
	(66, '2024-05-19', '26268051', 'AFTERNOON', 'H301'),
	(67, '2024-05-19', '26116507', 'EVENING', 'H301');

-- Dumping structure for table course_register_management.semesters
CREATE TABLE IF NOT EXISTS `semesters` (
  `end_date` date DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table course_register_management.semesters: ~3 rows (approximately)
INSERT INTO `semesters` (`end_date`, `id`, `start_date`, `name`) VALUES
	('2023-12-20', 1, '2023-09-01', 'HK1_2023-2024'),
	('2024-05-26', 2, '2023-12-26', 'HK2_2023-2024'),
	('2023-07-26', 3, '2024-06-01', 'HK3_2023-2024');

-- Dumping structure for table course_register_management.students
CREATE TABLE IF NOT EXISTS `students` (
  `date_of_birth` date DEFAULT NULL,
  `department_id` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `gender` enum('MALE','FEMALE') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKalgc33nsolpmegw14o3h6g6rr` (`department_id`),
  CONSTRAINT `FKalgc33nsolpmegw14o3h6g6rr` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table course_register_management.students: ~5 rows (approximately)
INSERT INTO `students` (`date_of_birth`, `department_id`, `email`, `full_name`, `id`, `password`, `phone`, `username`, `gender`) VALUES
	('2003-05-12', '1', 'quangnguyen@gmail.com', 'Nguyễn Hồ Đăng Quang', '21212328', 'MjEyMTIzMjg=', '0957680823', '21212328', 'MALE'),
	('2002-05-01', '1', 'giahuytran@gmail.com', 'Trần Gia Huy', '23016675', 'MjMwMTY2NzU=', '0902456712', '23016675', 'MALE'),
	('2003-05-06', '1', 'dochituong@gmail.com', 'Đỗ Chí Tường', '23317079', 'MjMzMTcwNzk=', '0327568929', '23317079', 'MALE'),
	('2003-10-19', '1', 'hoanglearning19@gmail.com', 'Nguyễn Huy Hoàng', '27205010', 'MjcyMDUwMTA=', '0367812993', '27205010', 'MALE'),
	('2000-05-06', '1', 'hoangngocnguyen2021@gmail.com', 'Nguyễn Thị Mai', '27547151', 'Mjc1NDcxNTE=', '0327194438', '27547151', 'FEMALE');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
