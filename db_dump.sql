-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.4.3 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for game_search_db
CREATE DATABASE IF NOT EXISTS `game_search_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `game_search_db`;

-- Dumping structure for table game_search_db.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `region` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `platform` enum('steam','playstation','xbox') NOT NULL DEFAULT 'steam',
  `image` varchar(255) DEFAULT 'steam',
  `likes` int DEFAULT '0',
  `price` double NOT NULL,
  `cashback_percentage` int DEFAULT NULL,
  `discount_percentage` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table game_search_db.products: ~3 rows (approximately)
INSERT INTO `products` (`id`, `name`, `region`, `platform`, `image`, `likes`, `price`, `cashback_percentage`, `discount_percentage`) VALUES
	(4, 'FIFA 23', 'Europe', 'playstation', 'fifa_23.jpg', 35, 59.99, 8, 15),
	(5, 'Red Dead Redemption 2', 'Asia', 'playstation', 'red_dead_redemption_2.jpg', 43, 39.99, 12, 25),
	(6, 'Split Fiction', 'Europe', 'steam', 'split_fiction.jpg', 23, 24.99, 5, 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
