-- Create database
CREATE DATABASE IF NOT EXISTS game_search_db;
USE game_search_db;


CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  likes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO products (name, description, likes) VALUES
  ('Sample Item 1', 'This is a sample item description', 333),
  ('Sample Item 2', 'Another sample item for testing', 222),
  ('Sample Item 3', 'Third sample item', 111);