CREATE DATABASE `elms` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
CREATE TABLE `branch` (
  `branch_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
CREATE TABLE `department` (
  `branch_id` int NOT NULL,
  `code` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `short_name` varchar(100) NOT NULL,
  PRIMARY KEY (`code`),
  KEY `id` (`branch_id`),
  KEY `code` (`code`),
  CONSTRAINT `id` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
CREATE TABLE `employee` (
  `branch_id` int NOT NULL,
  `dept_code` varchar(100) NOT NULL,
  `emp_id` varchar(100) NOT NULL,
  `role` varchar(100) DEFAULT NULL,
  `first_name` varchar(150) DEFAULT NULL,
  `last_name` varchar(150) DEFAULT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(300) NOT NULL,
  `gender` varchar(100) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `country` varchar(150) DEFAULT NULL,
  `city` varchar(200) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` char(20) DEFAULT NULL,
  `casual_leaves` int NOT NULL,
  `sick_leaves` int NOT NULL,
  `unpaid_leaves` int NOT NULL,
  PRIMARY KEY (`emp_id`),
  KEY `branch_id_idx` (`branch_id`),
  KEY `dept_code_idx` (`dept_code`,`branch_id`),
  CONSTRAINT `branch_id` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `dept_code` FOREIGN KEY (`dept_code`) REFERENCES `department` (`code`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
CREATE TABLE `holidays` (
  `date` date NOT NULL,
  `event` varchar(45) NOT NULL,
  PRIMARY KEY (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `leave_request` (
  `leave_id` int NOT NULL AUTO_INCREMENT,
  `emp_id` varchar(100) NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `type` varchar(150) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `status` varchar(45) NOT NULL,
  `admin_remarks` varchar(300) DEFAULT NULL,
  `days` int NOT NULL,
  `branch_manager_remarks` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`leave_id`),
  KEY `emp_id_idx` (`emp_id`),
  CONSTRAINT `emp_id2` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=latin1;
