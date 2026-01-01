-- Create products table
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `region` text,
  `platform` enum('steam','playstation','xbox') NOT NULL DEFAULT 'steam',
  `image` varchar(255) DEFAULT 'steam',
  `likes` int DEFAULT '0',
  `price` double NOT NULL,
  `cashback_percentage` int DEFAULT NULL,
  `discount_percentage` int DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Insert sample data
INSERT INTO `products` (`id`, `name`, `region`, `platform`, `image`, `likes`, `price`, `cashback_percentage`, `discount_percentage`) VALUES
(4, 'FIFA 23', 'Europe', 'playstation', 'fifa_23.jpg', 35, 59.99, 8, 15),
(5, 'Red Dead Redemption 2', 'Asia', 'playstation', 'red_dead_redemption_2.jpg', 43, 39.99, 12, 25),
(6, 'Split Fiction', 'Europe', 'steam', 'split_fiction.jpg', 23, 24.99, 5, 0);
