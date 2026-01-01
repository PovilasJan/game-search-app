const express = require('express');
const cors = require('cors');
const Fuse = require('fuse.js');
require('dotenv').config();

const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://povilasjan-eneba.vercel.app',
    /\.vercel\.app$/
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static images
app.use('/images', express.static(require('path').join(__dirname, '../images')));

// Base URL for images
const BASE_URL = process.env.RAILWAY_PUBLIC_DOMAIN 
  ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
  : process.env.BASE_URL || 'http://localhost:5000';

// List all products with Fuse.js fuzzy search
app.get('/list', async (req, res) => {
  try {
    const { search } = req.query;
    const [rows] = await db.query('SELECT * FROM products ORDER BY name ASC');
    
    // Add imageUrl to each product with full URL
    let products = rows.map(product => ({
      ...product,
      imageUrl: product.image ? `${BASE_URL}/images/${product.image}` : null
    }));

    // Apply fuzzy search if search query is provided
    if (search && search.trim()) {
      const fuse = new Fuse(products, {
        keys: ['name', 'region', 'platform'],
        threshold: 0.4,
        ignoreLocation: true
      });
      const results = fuse.search(search.trim());
      products = results.map(result => result.item);
    }

    res.json(products);
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
      console.log(`🚀 Server is running on ${process.env.PUBLIC_URL+":"+PORT}`);
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
