const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static images
app.use('/images', express.static(require('path').join(__dirname, '../images')));

// List all products or search with fuzzy matching
app.get('/list', async (req, res) => {
  try {
    const { search } = req.query;
    
    if (search && search.trim()) {
      // Fuzzy search using LIKE with wildcards for partial matching
      const searchTerm = `%${search.trim()}%`;
      const [rows] = await db.query(
        `SELECT *, 
          CASE 
            WHEN name LIKE ? THEN 3
            WHEN name LIKE ? THEN 2
            ELSE 1
          END as relevance
        FROM products 
        WHERE name LIKE ? OR region LIKE ?
        ORDER BY relevance DESC, name ASC`,
        [search.trim(), searchTerm, searchTerm, searchTerm]
      );
      // Add imageUrl to each product
      const products = rows.map(product => ({
        ...product,
        imageUrl: product.image ? `/images/${product.image}` : null
      }));
      res.json(products);
    } else {
      // Return all products
      const [rows] = await db.query('SELECT * FROM products ORDER BY id DESC');
      // Add imageUrl to each product
      const products = rows.map(product => ({
        ...product,
        imageUrl: product.image ? `/images/${product.image}` : null
      }));
      res.json(products);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Test database connection and start server
db.getConnection()
  .then((connection) => {
    console.log('✅ MySQL Database connected successfully');
    connection.release();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
    // Start server anyway for development
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT} (without database)`);
    });
  });

module.exports = app;
