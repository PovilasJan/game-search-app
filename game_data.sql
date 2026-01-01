-- Additional game data with variations
-- Same games, different regions, platforms, prices, discounts, cashbacks, likes

INSERT INTO `products` (`name`, `region`, `platform`, `image`, `likes`, `price`, `cashback_percentage`, `discount_percentage`) VALUES
-- FIFA 23 variations
('FIFA 23', 'North America', 'xbox', 'fifa_23.jpg', 28420, 64.99, 5, 20),
('FIFA 23', 'Asia', 'steam', 'fifa_23.jpg', 42150, 49.99, 10, 30),
('FIFA 23', 'South America', 'playstation', 'fifa_23.jpg', 18320, 54.99, 7, 10),
('FIFA 23', 'Global', 'steam', 'fifa_23.jpg', 56780, 44.99, 12, 35),
('FIFA 23', 'Middle East', 'xbox', 'fifa_23.jpg', 9840, 59.99, 6, 12),

-- Red Dead Redemption 2 variations
('Red Dead Redemption 2', 'Europe', 'steam', 'red_dead_redemption_2.jpg', 67230, 49.99, 8, 40),
('Red Dead Redemption 2', 'North America', 'xbox', 'red_dead_redemption_2.jpg', 52140, 44.99, 10, 35),
('Red Dead Redemption 2', 'Global', 'playstation', 'red_dead_redemption_2.jpg', 38920, 54.99, 15, 20),
('Red Dead Redemption 2', 'South America', 'steam', 'red_dead_redemption_2.jpg', 21540, 34.99, 18, 45),
('Red Dead Redemption 2', 'Asia', 'xbox', 'red_dead_redemption_2.jpg', 31280, 42.99, 9, 30),

-- Split Fiction variations
('Split Fiction', 'North America', 'playstation', 'split_fiction.jpg', 4520, 29.99, 8, 15),
('Split Fiction', 'Asia', 'xbox', 'split_fiction.jpg', 3180, 22.99, 6, 10),
('Split Fiction', 'South America', 'steam', 'split_fiction.jpg', 1890, 19.99, 10, 25),
('Split Fiction', 'Middle East', 'playstation', 'split_fiction.jpg', 2340, 27.99, 4, 5),
('Split Fiction', 'Global', 'xbox', 'split_fiction.jpg', 5670, 24.99, 7, 20);
